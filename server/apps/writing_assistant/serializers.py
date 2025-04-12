
from rest_framework import serializers
from .models import RewriteRequest

class RewriteRequestSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    
    class Meta:
        model = RewriteRequest
        fields = ['id', 'original_content', 'rewritten_content', 'instructions', 
                  'created_at', 'created_at_formatted', 'updated_at', 'user']
        read_only_fields = ['created_at', 'updated_at', 'user']
    
    def get_created_at_formatted(self, obj):
        return obj.created_at.strftime('%d/%m/%Y')