# writing_assistant/views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
import json

from .models import RewriteRequest
from .serializers import RewriteRequestSerializer
from .gemini_api import GeminiClient

# Existing views
def index(request):
    """Home page view"""
    return render(request, 'writing_assistant/index.html')

@csrf_exempt
def rewrite_content(request):
    """API endpoint to rewrite content"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            original_content = data.get('original_content', '')
            instructions = data.get('instructions', '')
            
            if not original_content:
                return JsonResponse({'error': 'Original content is required'}, status=400)
            
            # Create a rewrite request object
            rewrite_request = RewriteRequest(
                user=request.user if request.user.is_authenticated else None,
                original_content=original_content,
                instructions=instructions
            )
            
            # Call Gemini API to rewrite the content
            gemini_client = GeminiClient()
            rewritten_content = gemini_client.generate_content(
                original_content, 
                instructions
            )
            
            # Save the rewritten content
            rewrite_request.rewritten_content = rewritten_content
            rewrite_request.save()
            
            return JsonResponse({
                'id': rewrite_request.id,
                'original_content': original_content,
                'rewritten_content': rewritten_content,
                'instructions': instructions
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'Failed to rewrite content: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# CRUD API endpoints for history
@login_required
def history_view(request):
    """View để hiển thị lịch sử viết lại"""
    requests = RewriteRequest.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'writing_assistant/history.html', {'requests': requests})
class RewriteHistoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows rewrite history to be viewed, created, edited or deleted.
    """
    serializer_class = RewriteRequestSerializer
    #permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        """
        This view returns a list of all the rewrite requests
        for the currently authenticated user.
        """
        user = self.request.user
        return RewriteRequest.objects.filter(user=user)
    
    def perform_create(self, serializer):
        """Save the post data when creating a new rewrite request."""
        serializer.save(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        """Custom create method to handle rewriting content"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get the original content and instructions
        original_content = serializer.validated_data.get('original_content')
        instructions = serializer.validated_data.get('instructions', '')
        
        # Call Gemini API to rewrite the content
        gemini_client = GeminiClient()
        rewritten_content = gemini_client.generate_content(
            original_content, 
            instructions
        )
        
        # Save with rewritten content
        serializer.save(user=request.user, rewritten_content=rewritten_content)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_history(request):
    """Get rewrite history for the current user"""
    rewrite_requests = RewriteRequest.objects.filter(user=request.user)
    serializer = RewriteRequestSerializer(rewrite_requests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_history_detail(request, pk):
    """Get specific rewrite request details"""
    try:
        rewrite_request = RewriteRequest.objects.get(pk=pk, user=request.user)
        serializer = RewriteRequestSerializer(rewrite_request)
        return Response(serializer.data)
    except RewriteRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_history(request, pk):
    """Delete a specific rewrite request"""
    try:
        rewrite_request = RewriteRequest.objects.get(pk=pk, user=request.user)
        rewrite_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except RewriteRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_all_history(request):
    """Delete all rewrite history for the current user"""
    RewriteRequest.objects.filter(user=request.user).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_history(request, pk):
    """Update a specific rewrite request"""
    try:
        rewrite_request = RewriteRequest.objects.get(pk=pk, user=request.user)
        serializer = RewriteRequestSerializer(rewrite_request, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except RewriteRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
