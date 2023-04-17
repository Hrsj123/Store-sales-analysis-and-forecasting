from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
from .import_export_resources import *

@admin.register(WalmartStore)
class WalmartStoreAdmin(ImportExportModelAdmin):
    resource_class = WalmartStoreResource

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource

@admin.register(WalmartSales)
class WalmartSalesAdmin(ImportExportModelAdmin):
    resource_class = WalmartSalesResource
