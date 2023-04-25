HOLIDAY_CHOICES = [
    ('0', 'Workingday'),
    ('1', 'Holiday'),
]

MODEL_FILE_NAME = {
    'Linear Regression': 'linear_regression_model.sav',
    'knn_prediction': 'knn_model.sav',
    'Decision Tree': 'decision_tree_model.sav',
    'Random Forest': 'random_forest_model.sav',
    'XGBoost': 'xgboost_model.sav',
}

ML_FEATURE_NAMES_X = [
    'store_no',
    'holiday_flag',
    'year',
    'month',
    'week',
]

ML_FEATURE_NAME_Y = 'weekly_sales'