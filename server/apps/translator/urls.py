from django.urls import path
from .views import DetectionView

urlpatterns = [
    path('detect/', DetectionView.as_view(), name='detect_nom_characters'),
]