from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Detection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='detections')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    original_image = models.ImageField(upload_to='detections/original/')
    detected_image = models.ImageField(upload_to='detections/detected/')
    results_json = models.JSONField()

    def __str__(self):
        return f"Detection {self.id} by {self.user.username} at {self.uploaded_at}"
