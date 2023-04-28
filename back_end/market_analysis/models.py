from django.db import models
from .utils.constants import HOLIDAY_CHOICES
from django.core.validators import MaxValueValidator
from django.utils import timezone
import random

class WalmartStore(models.Model):
    store_no = models.CharField('Store no', max_length=2)
    date = models.CharField('Date', max_length=10)                                          # Should be date field
    weekly_sales = models.DecimalField('Weekly Sales', max_digits=12, decimal_places=2)
    holiday_flag = models.BooleanField('Holiday', max_length=1, choices=HOLIDAY_CHOICES, default=False)   
    temperature =  models.DecimalField('Temperature', max_digits=5, decimal_places=2, null=True, blank=True)
    fuel_price =  models.DecimalField('Temperature', max_digits=6, decimal_places=4, null=True, blank=True)
    cpi = models.DecimalField('CPI', max_digits=15, decimal_places=10, null=True, blank=True)
    unemployment = models.DecimalField('Unemployment', max_digits=6, decimal_places=3, null=True, blank=True)

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
    store_no = models.CharField('Store no', max_length=2)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='product', verbose_name='product')
    quantity = models.PositiveSmallIntegerField(null=True)
    date_time = models.DateTimeField('Date time', null=True, default=timezone.now)    

    class Meta:
        ordering = ['pk']

    def __str__(self) -> str:
        return f'{self.store_no} | {self.date_time}'