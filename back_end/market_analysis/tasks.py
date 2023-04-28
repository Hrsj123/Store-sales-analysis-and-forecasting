from __future__ import absolute_import, unicode_literals

from datetime import timedelta
from django.utils import timezone

import random
from .models import WalmartSales, WalmartStore
from .serializers import WalmartStoreSerializer
from .utils import ml_algorithms as algos
from .utils.methods import load_data
import os

from celery import shared_task


# task to be scheduled -> MISSING SCHEDULER
@shared_task
def add_product_data_weekly():
    for store_no in range(1, 45+1):        

        # weekly sales calculation:
        weekly_store_sales = WalmartSales.objects.filter(store_no=store_no)
        if not weekly_store_sales.count():              # If no prod sold in a particular store
            continue
        weekly_sales = 0
        for sales in weekly_store_sales:
            weekly_sales += sales.product.selling_price * sales.quantity
        
        # date calculation:
        now = timezone.now()
        prev_week_friday = now - timedelta(days=now.weekday() + 3, weeks=1)
        date = prev_week_friday.strftime("%d-%m-%Y")            # last firday's date
        if WalmartStore.objects.filter(date=date, store_no=store_no).count() != 0:             # Avoid copies of entry
            continue
        
        # holiday week calculation:
        holiday_flag = 1 if random.randint(0, 4) == 0 else 0    # (only 20% chance -> holiday_flah == 1)

        # save in walmartstore
        serializer = WalmartStoreSerializer(
            data={
                'store_no': store_no,
                'date': date,
                'weekly_sales': weekly_sales,
                'holiday_flag': holiday_flag,
            }
        )

        if serializer.is_valid():
            serializer.save()
        else:
            print('Some error occured!!!')
            
    # empty out walmart sales db
    WalmartSales.objects.all().delete()

    # run ml model training
    path_to_models = os.path.join('market_analysis', 'utils', 'ml_models')

    x_train, x_test, y_train, y_test = load_data()          

    algos.linear_regression_algorithm(path_to_models, x_train, y_train)
    algos.knn_algorithm(path_to_models, x_train, y_train)
    algos.decision_tree_algorithm(path_to_models, x_train, y_train)
    algos.random_forest_algorithm(path_to_models, x_train, y_train)
    algos.xg_boost_algorithm(path_to_models, x_train, x_test, y_train, y_test)

    


# COMMANDS TO RUN CELERY SCHEDULER:
# Start RabbitMQ Server
# celery -A back_end worker -l info --pool=solo
# celery -A back_end beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler