from sklearn.metrics import mean_squared_error, r2_score
from math import sqrt
import pickle
from .constants import ML_FEATURE_NAMES_X, ML_FEATURE_NAME_Y
from decimal import Decimal

from sklearn.model_selection import train_test_split
from ..models import WalmartStore
import pandas as pd

def load_model(X_new, filename):   
    """
        argument definition: 
            • X_new: np.array(store_no, holiday_flag, year, month, week)
            • filename: '.sav' file of the trained model
        This method predicts "y_pred" from input "X_new"
        This method also returns the score metrics of the ml model 
    """
    # 1: Load the ml model instance
    loaded_model = pickle.load(open(filename, 'rb'))

    y_pred = loaded_model.predict(X_new[ML_FEATURE_NAMES_X])          # 
    
    # 2: To calculate the model score:
    walmart_store_model = WalmartStore.objects.all()
    dataset = walmart_store_model.values('store_no', 'holiday_flag', 'date', 'weekly_sales')     # Add here!
    dataset_df = pd.DataFrame(dataset)
    
    # split dataset
    x_test_df = dataset_df[['store_no', 'holiday_flag', 'date']]
    y_test_df = dataset_df[ML_FEATURE_NAME_Y].astype('int64')
    
    # pre-process "x_test_df"
    x_test_df['date'] = pd.to_datetime(x_test_df['date'], dayfirst=True)
    x_test_df['year'] = x_test_df['date'].dt.year
    x_test_df['month'] = x_test_df['date'].dt.month 
    x_test_df['week'] = x_test_df['date'].dt.isocalendar().week
    x_test_df.drop('date', axis=1, inplace=True)
    x_test_df = x_test_df.astype('int64')
    
    # predict y from x_test
    y_pred_df = loaded_model.predict(x_test_df)

    return {
        "weeklySalesPrediction": y_pred[0],
        "r2Score": Decimal(r2_score(y_test_df, y_pred_df)),
        "mseScore": mean_squared_error(y_test_df, y_pred_df),
        "rmseScore": sqrt(mean_squared_error(y_test_df, y_pred_df)),
        "y_test": y_test_df[::int(len(y_test_df)/500)],  
        "y_pred": y_pred_df[::int(len(y_pred_df)/500)],        
    }

def load_data():        # Used to train / re-reain ml models
    #
    x = WalmartStore.objects.all().values('store_no', 'holiday_flag', 'date')
    x_df = pd.DataFrame(x)
    
    x_df["date"] = pd.to_datetime(x_df["date"], dayfirst=True)
    x_df['year'] = x_df['date'].dt.year
    x_df['month'] = x_df['date'].dt.month 
    x_df['week'] = x_df['date'].dt.isocalendar().week
    x_df.drop('date', axis=1, inplace=True)
    x_df = x_df.astype('int64')
    
    #
    y = WalmartStore.objects.all().values('weekly_sales')
    y_df = pd.DataFrame(y).values.ravel()
    
    # Will raise error if x_df, y_df has data less than the min split percentage!
    x_train, x_test, y_train, y_test = 0, 0, 0, 0
    try:
        x_train, x_test, y_train, y_test = train_test_split(x_df, y_df, train_size = 0.8, random_state = 0)
    except:
        print(len(x_df), len(y_df))

    return x_train, x_test, y_train, y_test 
