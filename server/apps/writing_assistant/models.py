
from django.db import models
from django.contrib.auth.models import User

class RewriteRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    original_content = models.TextField()
    rewritten_content = models.TextField(blank=True)
    instructions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f"Rewrite request {self.id} - {self.created_at.strftime('%d/%m/%Y')}"
    
    class Meta:
        ordering = ['-created_at']
