# writing_assistant/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'rewrite-history', views.RewriteHistoryViewSet, basename='rewrite-history')
app_name = 'writing_assistant'

urlpatterns = [
    path('rewrite/', views.rewrite_content, name='rewrite_content'),
    path('', include(router.urls)),
    path('history/all/', views.get_history, name='get_history'),
    path('history/<int:pk>/', views.get_history_detail, name='get_history_detail'),
    path('history/<int:pk>/delete/', views.delete_history, name='delete_history'),
    path('history/<int:pk>/update/', views.update_history, name='update_history'),
    path('history/delete-all/', views.delete_all_history, name='delete_all_history'),
]