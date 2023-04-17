from .decision_tree import filename as d_tree_filename
from .random_forest import filename as rf_filename
from .xgboost import filename as xg_filename
from ..predict import load_model 

def avg_algorithm(y_test, X_new):
    d_tree_model = load_model(y_test=y_test, X_new=X_new, filename=d_tree_filename)
    rf_model = load_model(y_test=y_test, X_new=X_new, filename=rf_filename)
    xg_boost_model = load_model(y_test=y_test, X_new=X_new, filename=xg_filename)

    avg_pred = (d_tree_model[0] + rf_model[0] + xg_boost_model[0]) / 3
    avg_r2_score = (d_tree_model[1]['r2_score'] + rf_model[1]['r2_score'] + xg_boost_model[1]['r2_score']) / 3
    avg_mse_score = (d_tree_model[1]['mse_score'] + rf_model[1]['mse_score'] + xg_boost_model[1]['mse_score']) / 3
    avg_rmse_score = (d_tree_model[1]['rmse_score'] + rf_model[1]['rmse_score'] + xg_boost_model[1]['rmse_score']) / 3

    return (avg_pred, {
        "r2_score": avg_r2_score,
        "mse_score": avg_mse_score,
        "rmse_score": avg_rmse_score
    })
