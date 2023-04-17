from sklearn.linear_model import LinearRegression
import pickle
import os

filename = os.path.join('..', 'models', 'linear_regression_model.sav')

def linear_regression_algorithm(x_train, y_train):
    model = LinearRegression()
    model.fit(x_train, y_train)

    pickle.dump(model, open(filename, 'wb'))
