from django.contrib import admin
from .models import WalmartStore
from import_export.admin import ImportExportModelAdmin
from .import_export_resources import WalmartStoreResource

@admin.register(WalmartStore)
class WalmartStoreAdmin(ImportExportModelAdmin):
    resource_class = WalmartStoreResource
