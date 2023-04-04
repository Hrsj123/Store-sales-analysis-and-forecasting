from django.db import models
from .utils.constants import HOLIDAY_CHOICES

class WalmartStore(models.Model):
    Store = models.CharField('Store no', max_length=2)
    Date = models.CharField('Date', max_length=10)
    Weekly_Sales = models.DecimalField('Weekly Sales', max_digits=12, decimal_places=2)
    Holiday_Flag = models.CharField('Holiday', max_length=1, choices=HOLIDAY_CHOICES)   
    Temperature =  models.DecimalField('Temperature', max_digits=5, decimal_places=2)
    Fuel_Price =  models.DecimalField('Temperature', max_digits=6, decimal_places=4)
    CPI = models.DecimalField('CPI', max_digits=15, decimal_places=10)
    Unemployment = models.DecimalField('Unemployment', max_digits=6, decimal_places=3)

    class Meta:
        ordering = ['pk']

    def __str__(self) -> str:
        return f'{self.Store} | {self.Date}'