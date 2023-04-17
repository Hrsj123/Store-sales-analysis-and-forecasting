from sklearn.tree import DecisionTreeRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import xgboost as xgb

from .methods import load_model
import pickle
import os


# decision_tree
def decision_tree_algorithm(knn_model_filepath, x_train, y_train):
    model = DecisionTreeRegressor()
    model.fit(x_train, y_train)                                            
    d_tree_filename = os.path.join(knn_model_filepath, 'decision_tree_model.sav')
    pickle.dump(model, open(d_tree_filename, 'wb'))


# knn
def knn_algorithm(knn_model_filepath, x_train, y_train):
    model = KNeighborsRegressor()
    model.fit(x_train, y_train)                                            
    knn_filename = os.path.join(knn_model_filepath, 'knn_model.sav')
    pickle.dump(model, open(knn_filename, 'wb'))


# linear regression
def linear_regression_algorithm(linear_regression_model_filepath, x_train, y_train):
    model = LinearRegression()
    model.fit(x_train, y_train)
    linear_regression_filename = os.path.join(linear_regression_model_filepath, 'linear_regression_model.sav')
    pickle.dump(model, open(linear_regression_filename, 'wb'))


# random forest
def random_forest_algorithm(random_forest_model_path, x_train, y_train):
    model = RandomForestRegressor()
    model.fit(x_train, y_train)                               
    random_forest_filename = os.path.join(random_forest_model_path, 'random_forest_model.sav')
    pickle.dump(model, open(random_forest_filename, 'wb'))


# xg boost
def xg_boost_algorithm(xg_boost_model_filepath, x_train, x_test, y_train, y_test):
    model = xgb.XGBRegressor()
    model.fit(x_train, y_train)

    xg_boost_filename = os.path.join(xg_boost_model_filepath, 'xgboost_model.sav')
    pickle.dump(model, open(xg_boost_filename, 'wb'))


# avg of three algos
def avg_algorithm(path_to_ml_models, X_new, y_test):
    d_tree_model = load_model(y_test=y_test, X_new=X_new, filename=os.path.join(path_to_ml_models, 'decision_tree_model.sav'))
    rf_model = load_model(y_test=y_test, X_new=X_new, filename=os.path.join(path_to_ml_models, 'random_forest_model.sav'))
    xg_boost_model = load_model(y_test=y_test, X_new=X_new, filename=os.path.join(path_to_ml_models, 'xgboost_model.sav'))
    # avg calculation
    avg_pred = (d_tree_model[0] + rf_model[0] + xg_boost_model[0]) / 3
    avg_r2_score = (d_tree_model[1]['r2_score'] + rf_model[1]['r2_score'] + xg_boost_model[1]['r2_score']) / 3
    avg_mse_score = (d_tree_model[1]['mse_score'] + rf_model[1]['mse_score'] + xg_boost_model[1]['mse_score']) / 3
    avg_rmse_score = (d_tree_model[1]['rmse_score'] + rf_model[1]['rmse_score'] + xg_boost_model[1]['rmse_score']) / 3

    return (avg_pred, {
        "r2_score": avg_r2_score,
        "mse_score": avg_mse_score,
        "rmse_score": avg_rmse_score
    })
