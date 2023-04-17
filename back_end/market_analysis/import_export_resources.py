from import_export import fields, widgets, resources
from import_export.widgets import ForeignKeyWidget
from .models import *

class WalmartStoreResource(resources.ModelResource):
    class Meta:
        model = WalmartStore
        clean_model_instances = True
        exclude = ('id',)
        import_id_fields = ('store_no',)

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        clean_model_instances = True
        exclude = ('id',)
        import_id_fields = ('name',)

class WalmartSalesResource(resources.ModelResource):
    store = fields.Field(column_name='store', attribute='store', widget=ForeignKeyWidget(WalmartStore, 'store_no'))
    product = fields.Field(column_name='product', attribute='product', widget=ForeignKeyWidget(Product, 'name'))

    class Meta:
        model = WalmartSales
        clean_model_instances = True