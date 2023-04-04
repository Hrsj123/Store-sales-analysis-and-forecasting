from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import WalmartStore
from .serializers import WalmartStoreSerializer

class WalmartStoreViewset(viewsets.ModelViewSet):
    queryset = WalmartStore.objects.all()
    serializer_class = WalmartStoreSerializer
    lookup_field = 'id'
    ordering_fields = ['Store']


    def create(self, request, *args, **kwargs):
        if type(request.data) == list:
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        