from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'data', WalmartStoreViewset, basename='data')

urlpatterns = [
    path('analysis/', include(router.urls)),
    path('storeWeeklySale/', StoreWeeklyRevenuePlotView.as_view()),
    path('compareStoresAvgWeeklySale/', StoreAvgWeeklySalesComparePlotView.as_view()),
    path('predictValue/', PredictView.as_view()),
    path('products/', ProductView.as_view()),
    path('addSales/', AddStoreView.as_view()),
]
