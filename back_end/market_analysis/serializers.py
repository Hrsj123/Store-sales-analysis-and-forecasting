from rest_framework import serializers
from .models import WalmartStore, HOLIDAY_CHOICES
from decimal import Decimal

class WalmartStoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = WalmartStore
        exclude = ('id',)

    
    