from rest_framework import serializers
from .models import Detection

class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = '__all__'
        read_only_fields = ['user']  # user is set from request, not by client
class HistorySerializer(serializers.ModelSerializer):
    """
    Serializer optimized for the history view with less detail
    """
    formatted_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Detection
        fields = [
            'id', 
            'original_image', 
            'detected_image', 
            'uploaded_at',
            'formatted_date'
        ]
    
    def get_formatted_date(self, obj):
        return obj.uploaded_at.strftime('%d/%m/%Y')