# Generated by Django 4.1.7 on 2023-04-14 17:20

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market_analysis', '0002_alter_walmartstore_fuel_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Name')),
                ('selling_price', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(1000000)], verbose_name='Selling Price')),
                ('description', models.CharField(max_length=250, verbose_name='Description')),
            ],
            options={
                'ordering': ['pk'],
            },
        ),
        migrations.RenameField(
            model_name='walmartstore',
            old_name='CPI',
            new_name='cpi',
        ),
        migrations.RenameField(
            model_name='walmartstore',
            old_name='Date',
            new_name='date',
        ),
        migrations.RenameField(
            model_name='walmartstore',
            old_name='Fuel_Price',
            new_name='fuel_price',
        ),
        migrations.RenameField(
            model_name='walmartstore',
            old_name='Store',
            new_name='store_no',
        ),
        migrations.RenameField(
            model_name='walmartstore',
            old_name='Temperature',
            new_name='temperature',
        ),
        migrations.RenameField(
            model_name='walmartstore',
            old_name='Unemployment',
            new_name='unemployment',
        ),
        migrations.RenameField(
            model_name='walmartstore',
            old_name='Weekly_Sales',
            new_name='weekly_sales',
        ),
        migrations.RemoveField(
            model_name='walmartstore',
            name='Holiday_Flag',
        ),
        migrations.CreateModel(
            name='WalmartSales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(verbose_name='Date')),
                ('isHoliday', models.BooleanField(choices=[('0', 'Workingday'), ('1', 'Holiday')], default=False, max_length=1, verbose_name='Holiday')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='product', to='market_analysis.product', verbose_name='product')),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='store', to='market_analysis.walmartstore', verbose_name='store')),
            ],
            options={
                'ordering': ['pk'],
            },
        ),
        migrations.AddField(
            model_name='walmartstore',
            name='holiday_flag',
            field=models.BooleanField(choices=[('0', 'Workingday'), ('1', 'Holiday')], default=False, max_length=1, verbose_name='Holiday'),
        ),
    ]
