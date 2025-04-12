
from django.contrib import admin
from .models import RewriteRequest

@admin.register(RewriteRequest)
class RewriteRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'created_at', 'original_content_preview')
    list_filter = ('created_at',)
    search_fields = ('original_content', 'rewritten_content')
    readonly_fields = ('created_at', 'updated_at')
    
    def original_content_preview(self, obj):
        max_length = 50
        if len(obj.original_content) > max_length:
            return obj.original_content[:max_length] + '...'
        return obj.original_content
    
    original_content_preview.short_description = 'Original Content'
