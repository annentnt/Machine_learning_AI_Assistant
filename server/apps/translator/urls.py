from django.urls import path
from .views import DetectionView, HistoryView, HistoryDetailView

urlpatterns = [
    path('detect/', DetectionView.as_view(), name='detect_nom_characters'),
    path('history/', HistoryView.as_view(), name='translation_history'),
    path('history/<int:pk>/', HistoryDetailView.as_view(), name='translation_detail'),

]