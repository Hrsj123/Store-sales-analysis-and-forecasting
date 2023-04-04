import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import math
from math import sqrt

import datetime
import warnings
warnings.filterwarnings('ignore')

from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import *

walmart = pd.read_csv('Walmart.csv')
walmart.head()

walmart.shape

walmart.info()

# Converting 'Date' column to datetime and adding 'Year', 'Month' and 'Week' column

walmart["Date"] = pd.to_datetime(walmart["Date"])
walmart['Year'] = walmart['Date'].dt.year
walmart['Month'] = walmart['Date'].dt.month 
walmart['Week'] = walmart['Date'].dt.week

walmart.head()

walmart.info()

walmart.describe()

#Checking Null

walmart.isnull().sum()                                                                                                      

#Checking Duplicates

walmart.duplicated().sum()                                                                                      

walmart.groupby('Month')['Weekly_Sales'].mean()

walmart.groupby('Year')['Weekly_Sales'].mean()

# Data Visualization

# Analyzing the distribution of target variable
plt.figure(figsize = (10, 5))
sns.distplot(walmart['Weekly_Sales'], hist_kws=dict(edgecolor="black"))
plt.title('Weekly Sales Distribution', fontsize= 15)
plt.grid()
plt.show()

walmart['Holiday_Flag'].value_counts()

sns.countplot(x = 'Holiday_Flag', data = walmart);

plt.figure(figsize=(20,8))
sns.barplot(walmart['Store'], walmart['Weekly_Sales'])
plt.title('Weekly Sales by Store', fontsize=18)
plt.ylabel('Sales', fontsize=16)
plt.xlabel('Store', fontsize=16)
plt.grid()
plt.show()

#This function plots the graph relation between a categorized feature and the Weekly_Sales

def graph_relation_to_weekly_sale(col_relation, df, x='Week', palette=None):
    cmap = sns.diverging_palette(220, 20, as_cmap=True)

    sns.relplot(
        x=x,
        y='Weekly_Sales',
        hue=col_relation,
        data=df,
        kind='line',
        height=5,
        aspect=2,
        palette=palette
    )
    plt.show()

graph_relation_to_weekly_sale('Year', walmart, x='Date', palette='Set2')

plt.figure(figsize = (20, 7))
sns.barplot(walmart['Weekly_Sales'])
# walmart['Week'],
plt.title('Average Weekly Sales', fontsize=18)
plt.ylabel('Weekly Sales', fontsize=16)
plt.xlabel('Week', fontsize=16)
plt.grid()
plt.show()

plt.figure(figsize = (20,10))
sns.heatmap(walmart.corr(), cmap = 'PuBu', annot = True)
plt.show()

walmart.drop(['Temperature', 'Fuel_Price', 'CPI', 'Unemployment'], axis = 1, inplace = True)

x = walmart.drop(['Date','Weekly_Sales'], axis=1)
x

y = walmart['Weekly_Sales']

rf = RandomForestRegressor(n_estimators = 100)
rf.fit(x, y)

# checking the feature importance

plt.figure(figsize = (15, 5))
plt.bar(x.columns, rf.feature_importances_)
plt.title("Feature Importance", fontsize = 15)
plt.show()

x_train, x_test, y_train, y_test = train_test_split(x, y, train_size = 0.8, random_state = 0)

# Linear Regression
lr = LinearRegression()
lr.fit(x_train, y_train)

y_pred = lr.predict(x_test)

plt.scatter(y_test, y_pred)

print("R2 Score: ", r2_score(y_test, y_pred))
print("MSE Score: ", mean_squared_error(y_test, y_pred))
print("RMSE : ", sqrt(mean_squared_error(y_test, y_pred)))

# Decision Tree
dtree = DecisionTreeRegressor()
dtree.fit(x_train, y_train)

y_pred1 = dtree.predict(x_test)

plt.scatter(y_test, y_pred1)

print("R2 Score: ", r2_score(y_test, y_pred1))
print("MSE Score: ", mean_squared_error(y_test, y_pred1))
print("RMSE : ", sqrt(mean_squared_error(y_test, y_pred1)))

# Random Forest 
rf1 = RandomForestRegressor(n_estimators = 100)
rf1.fit(x_train, y_train)

y_pred2 = rf1.predict(x_test)

plt.scatter(y_test, y_pred2)

print("R2 Score: ", r2_score(y_test, y_pred2))
print("MSE Score: ", mean_squared_error(y_test, y_pred2))
print("RMSE : ", sqrt(mean_squared_error(y_test, y_pred2)))

# KNN
knn = KNeighborsRegressor()
knn.fit(x_train, y_train)

y_pred3 = knn.predict(x_test)

plt.scatter(y_test, y_pred3)

print("R2 Score: ", r2_score(y_test, y_pred3))
print("MSE Score: ", mean_squared_error(y_test, y_pred3))
print("RMSE : ", sqrt(mean_squared_error(y_test, y_pred3)))

# XG Boost
xg = XGBRegressor()
xg.fit(x_train, y_train)

y_pred4 = xg.predict(x_test)

plt.scatter(y_test, y_pred4)

print("R2 Score: ", r2_score(y_test, y_pred4))
print("MSE Score: ", mean_squared_error(y_test, y_pred4))
print("RMSE : ", sqrt(mean_squared_error(y_test, y_pred4)))

# Average of best models
y_pred_final = (y_pred1 + y_pred2  + y_pred4)/3.0

plt.scatter(y_test, y_pred_final)

print("R2 Score: ", r2_score(y_test, y_pred_final))
print("MSE Score: ", mean_squared_error(y_test, y_pred_final))
print("RMSE : ", sqrt(mean_squared_error(y_test, y_pred_final)))

