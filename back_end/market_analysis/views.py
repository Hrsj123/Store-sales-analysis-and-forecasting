import os
import pandas as pd
from django.db import transaction
from rest_framework import viewsets, views, status, mixins
from rest_framework.response import Response
from .models import *
from .serializers import *
from .utils import ml_algorithms as algos
from .utils.methods import load_model, load_data
from .utils.constants import MODEL_FILE_NAME


class WalmartStoreViewset(viewsets.ModelViewSet):
    queryset = WalmartStore.objects.all()
    serializer_class = WalmartStoreSerializer
    lookup_field = 'id'
    ordering_fields = ['Store']

    def create(self, request, *args, **kwargs):
        # check data
        if type(request.data) == list:
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # bulk create
        if serializer.is_valid():
            with transaction.atomic():
                instances = [WalmartStore(**item) for item in serializer.validated_data]
                WalmartStore.objects.bulk_create(instances)
        else:
            return Response('Wrong JSON data!', status=status.HTTP_400_BAD_REQUEST)

        path_to_models = os.path.join('market_analysis', 'utils', 'ml_models')

        x_train, x_test, y_train, y_test = load_data()          

        algos.linear_regression_algorithm(path_to_models, x_train, y_train)
        algos.knn_algorithm(path_to_models, x_train, y_train)
        algos.decision_tree_algorithm(path_to_models, x_train, y_train)
        algos.random_forest_algorithm(path_to_models, x_train, y_train)
        algos.xg_boost_algorithm(path_to_models, x_train, x_test, y_train, y_test)

        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        
# Plots Idea:
# Idea yet to be implemented! -> Product sold pie-chart for each shop!

# Plots
class StoreWeeklyRevenuePlotView(views.APIView): 
    def get(self, request, format=None):
        param_store_no = request.query_params.get('store-no')
        if not param_store_no:
            return Response('Please provide a query parameter with key of "store-no"', status=status.HTTP_400_BAD_REQUEST)
        queryset = WalmartStore.objects.filter(store_no=param_store_no).values('date', 'weekly_sales')
        ser = StoreWeeklyRevenuePlotSerializer(queryset, many=True) 
        return Response(ser.data[0])
    

class StoreAvgWeeklySalesComparePlotView(views.APIView): 
    def get(self, request, format=None):
        queryset = WalmartStore.objects.all().values('store_no', 'weekly_sales')
        ser = StoreAvgWeeklySalesComparePlotSerializer(queryset, many=True)
        return Response(ser.data[0])

# Predict
class PredictView(views.APIView):       

    def get(self, request, format=None):
        store_no = request.query_params.get('store_no')
        holiday_flag = request.query_params.get('holiday_flag')
        year = request.query_params.get('year')
        month = request.query_params.get('month')
        week = request.query_params.get('week')

        if not store_no or not holiday_flag or not year or not month or not week:
            return Response("Please provide the following attributes 'store_no, holiday_flag, year, month, week' ")
         
        # Only predict for a single request arr
        X_new = pd.DataFrame({
            'store_no': [store_no], 
            'holiday_flag': [holiday_flag], 
            'year': [year], 
            'month': [month], 
            'week': [week],
        }).astype('int64')

        res = {}
        for i, j in MODEL_FILE_NAME.items():
            y_predicted_value_metric = load_model(X_new, os.path.join('market_analysis', 'utils', 'ml_models', j))
            res[i] = y_predicted_value_metric

        model1, model2, model3 = res['Decision Tree'], res['Random Forest'], res['XGBoost']
        res['Average of Best Models (Decision Tree, Random Forest, XGBoost)'] = {
            'weeklySalesPrediction': (model1['weeklySalesPrediction'] + model2['weeklySalesPrediction'] + model3['weeklySalesPrediction']) / 3,
            'r2Score': (model1['r2Score'] + model2['r2Score'] + model3['r2Score']) / 3,
            'mseScore': (model1['mseScore'] + model2['mseScore'] + model3['mseScore']) / 3,
            'rmseScore': (model1['rmseScore'] + model2['rmseScore'] + model3['rmseScore']) / 3,
            'y_test': (model1['y_test'] + model2['y_test'] + model3['y_test']) / 3,
            'y_pred': (model1['y_pred'] + model2['y_pred'] + model3['y_pred']) / 3,
        }

        return Response(res)
    
# The next 2 views can be created at once using genericViewset and (get and post)
# class GetProduct(views.APIView):

#     def get(self, request, format=None):
#         products = Product.objects.all()
#         ser = ProductSerializer(data=products, many=True)
#         return ser.data

class ProductView(views.APIView):
    
    def get(self, request, format=None):
        ser = ProductSerializer(Product.objects.all(), many=True)
        return Response(ser.data)

# incomplete!
        

    # ------------------------------------------------------------------------ option 1
# class AddStoreView(views.APIView):
#     # queryset = Product.objects.all()
#     # serializer_class = ProductSerializer
    
#     def post(self, request):             # Re-define to create store records!
#         # storeNumber = request.query_params.get('storeNumber')
#         # if not storeNumber:
#         #     return Response('Provide the store number!', status=status.HTTP_400_BAD_REQUEST )
#         # data = list(map(lambda x: list(x.split('$')), request.data))
#         serializer = WalmartSalesSerializer(data=request.data)
#         print('--------------------------')
#         print(serializer.data)
#         print('--------------------------')
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         # storeNumber = request.query_params.get('storeNumber')
#         # if not storeNumber:
#         #     return Response('Provide the store number!', status=status.HTTP_400_BAD_REQUEST )
#         # print('----------------------')
#         # print(storeNumber)
#         # data = list(map(lambda x: list(x.split('$')), request.data))
#         # print(data)
#         # print('----------------------')
#         # ser = WalmartSalesSerializer(data=data, many=True)
#         # if ser.is_valid():
#         #     print(ser.data)
#         #     # ser.save()
#         #     return Response(ser.data, status=status.HTTP_201_CREATED)
#         # print('----------------------')

#         return Response(ser.data, status=status.HTTP_201_CREATED)
        

        # ---------------------------------------------- option 2
# class AddStoreViewset(viewsets.ModelViewSet):
#     queryset = WalmartSales.objects.all()
#     serializer_class = WalmartSalesSerializer
#     lookup_field = 'id'
#     ordering_fields = ['Store']
