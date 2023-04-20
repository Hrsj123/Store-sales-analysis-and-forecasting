from django.db import models
from .utils.constants import HOLIDAY_CHOICES
from django.core.validators import MaxValueValidator
from django.utils import timezone

class WalmartStore(models.Model):
    store_no = models.CharField('Store no', max_length=2)
    date = models.CharField('Date', max_length=10)                                          # Should be date field
    weekly_sales = models.DecimalField('Weekly Sales', max_digits=12, decimal_places=2)
    holiday_flag = models.BooleanField('Holiday', max_length=1, choices=HOLIDAY_CHOICES, default=False)   
    temperature =  models.DecimalField('Temperature', max_digits=5, decimal_places=2)
    fuel_price =  models.DecimalField('Temperature', max_digits=6, decimal_places=4)
    cpi = models.DecimalField('CPI', max_digits=15, decimal_places=10)
    unemployment = models.DecimalField('Unemployment', max_digits=6, decimal_places=3)

    class Meta:
        ordering = ['pk']

    def __str__(self) -> str:
        return f'{self.store_no} | {self.date}'

class Product(models.Model):
    name = models.CharField('Name', max_length=50)
    selling_price = models.PositiveIntegerField('Selling Price', validators=[MaxValueValidator(1000000)])
    description = models.CharField('Description', max_length=250)

    class Meta:
        ordering = ['pk']

    def __str__(self) -> str:
        return self.name

# Will accumulate data for a week and push it in the Walmart Store above! -> Incomplete!
class WalmartSales(models.Model):           # A relationship table between WalmartStore and Product
    store = models.ForeignKey(WalmartStore, on_delete=models.PROTECT, related_name='store', verbose_name='store')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='product', verbose_name='product')
    quantity = models.PositiveSmallIntegerField(null=True)
    date_time = models.DateTimeField('Date time', null=True, default=timezone.now)    
    isHoliday = models.BooleanField('Holiday', max_length=1, choices=HOLIDAY_CHOICES, default=False)   # from datetime

    class Meta:
        ordering = ['pk']

    def __str__(self) -> str:
        return f'{self.store.store_no} | {self.date_time}'