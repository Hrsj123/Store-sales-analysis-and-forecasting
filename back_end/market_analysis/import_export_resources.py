from import_export import resources
from .models import WalmartStore

class WalmartStoreResource(resources.ModelResource):
    class Meta:
        model = WalmartStore
        clean_model_instances = True


