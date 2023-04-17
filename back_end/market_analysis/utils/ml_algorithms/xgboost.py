from xgboost import XGBRegressor
import pickle
import os

filename = os.path.join('..', 'models', 'xgboost_model.sav')

def xgboost_algorithm(x_train, y_train):
    model = XGBRegressor()
    model.fit(x_train, y_train)                                            

    pickle.dump(model, open(filename, 'wb'))