from rest_framework import serializers
from .models import Detection

class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = '__all__'
        read_only_fields = ['user']  # user is set from request, not by client
