import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Detection
from .serializers import DetectionSerializer
from .serializers import HistorySerializer
from django.core.files.base import ContentFile
from django.http import HttpResponse
import os
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination
# Load YOLO11 model
from ultralytics import YOLO
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model/best.pt')
model = YOLO(MODEL_PATH)

class StandardResultsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
class DetectionView(APIView):
    def post(self, request, format=None):
        image_file = request.FILES['image']
    

        # Read image using OpenCV
        img_array = np.frombuffer(image_file.read(), np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Run YOLO detection
        results = model(img)

        # Get the first result
        result = results[0]
        boxes = result.boxes.xyxy.cpu().numpy()
        labels = result.boxes.cls.cpu().numpy()
        scores = result.boxes.conf.cpu().numpy()

        results_json = []

        # Draw boxes with OpenCV
        for box, label_id, score in zip(boxes, labels, scores):
            x1, y1, x2, y2 = map(int, box)
            label_name = model.names[int(label_id)] if hasattr(model, 'names') else str(label_id)
            results_json.append({
                'label': label_name,
                'confidence': float(score),
                'bbox': [x1, y1, x2, y2]
            })

            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Now use PIL to draw text (Vietnamese supported)
        img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(img_pil)

        # Load a Vietnamese-supported font
        font_path = os.path.join('vn_font', 'arial.ttf')  # Adjust this path
        font = ImageFont.truetype(font_path, 15)

        # Draw the label names
        for box, label_id in zip(boxes, labels):
            x1, y1, _, _ = map(int, box)
            label_name = model.names[int(label_id)]
            draw.text((x1, y1 - 5), label_name, font=font, fill=(210, 1, 3))  # (R,G,B)
            draw.text((x1 + 1, y1 - 5), label_name, font=font, fill=(210, 1, 3))
            

        # Convert back to OpenCV BGR format
        img = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)

        # Save the output image in memory
        _, img_encoded = cv2.imencode('.jpg', img)
        content = ContentFile(img_encoded.tobytes(), name='detected.jpg')

        # Create detection object
        detection = Detection.objects.create(
            user=request.user,
            original_image=image_file,
            detected_image=content,
            results_json=results_json,
        )

        # serializer = DetectionSerializer(detection)
        # return Response(serializer.data, status=status.HTTP_201_CREATED)

        #return HttpResponse(content, content_type='image/jpeg')
        return Response({
            'id': detection.id,
            'original_image': detection.original_image.url,
            'detected_image': detection.detected_image.url,
            'uploaded_at': detection.uploaded_at,
      
        })


    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        detections = Detection.objects.filter(user=request.user).order_by('-uploaded_at')
        serializer = DetectionSerializer(detections, many=True)
        return Response(serializer.data)
    


class HistoryView(APIView):
    pagination_class = StandardResultsPagination

    @method_decorator(login_required)
    def get(self, request):
        detections = Detection.objects.filter(user=request.user).order_by('-uploaded_at')
        
        # Handle pagination
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(detections, request)
        
        if page is not None:
            serializer = HistorySerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
            
        serializer = HistorySerializer(detections, many=True)
        return Response(serializer.data)

class HistoryDetailView(APIView):
    @method_decorator(login_required)
    def get(self, request, pk):
        try:
            detection = Detection.objects.get(pk=pk, user=request.user)
        except Detection.DoesNotExist:
            return Response({'error': 'Detection not found'}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = DetectionSerializer(detection)
        return Response(serializer.data)
        
    @method_decorator(login_required)
    def delete(self, request, pk):
        try:
            detection = Detection.objects.get(pk=pk, user=request.user)
        except Detection.DoesNotExist:
            return Response({'error': 'Detection not found'}, status=status.HTTP_404_NOT_FOUND)
            
        detection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    @method_decorator(login_required)
    def put(self, request, pk):
        try:
            detection = Detection.objects.get(pk=pk, user=request.user)
        except Detection.DoesNotExist:
            return Response({'error': 'Detection not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = DetectionSerializer(detection, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)