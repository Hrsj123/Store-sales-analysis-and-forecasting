from rest_framework import serializers
from .models import *
from django.db.models import Avg
from datetime import datetime as dt


class WalmartStoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = WalmartStore
        exclude = ('id',)


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ('id',)


class WalmartSalesSerializer(serializers.ModelSerializer):

    class Meta:
        model = WalmartSales
        exclude = ('id',)


class StoreWeeklyRevenuePlotListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        dates, weekly_sales = [], []
        for i in data:
            # date_obj = dt.strptime(i['date'], '%d-%m-%Y').date()
            # dates.append(date_obj.isocalendar()[1])
            dates.append(i['date'])
            weekly_sales.append(i['weekly_sales'])

        return [{
            "dates": dates,
            "weekly_sales": weekly_sales,
        }]
    

class StoreWeeklyRevenuePlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = WalmartStore
        fields = ('date', 'weekly_sales')
        list_serializer_class = StoreWeeklyRevenuePlotListSerializer


class StoreAvgWeeklySalesComparePlotListSerializer(serializers.ListSerializer):
    avg_field = serializers.SerializerMethodField()

    def to_representation(self, data):
        store_no, avg_sales = [], []  
        
        for i in data:
            if i['store_no'] in store_no:
                continue
            store_no.append(i['store_no'])
            avg_sales.append(self.get_avg_field(obj=i))

        return [{
            "store_no": store_no,
            "avg_sales": avg_sales,
        }]
    
    def get_avg_field(self, obj):
        avg_value = WalmartStore.objects.filter(store_no=obj['store_no']).aggregate(avg_field=Avg('weekly_sales'))['avg_field']
        return avg_value

class StoreAvgWeeklySalesComparePlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = WalmartStore
        fields = ('store_no', 'avg_field')
        list_serializer_class = StoreAvgWeeklySalesComparePlotListSerializer

    