from sklearn.ensemble import RandomForestRegressor
import pickle
import os

filename = os.path.join('..', 'models', 'random_forest_model.sav')

def random_forest_algorithm(x_train, y_train):
    model = RandomForestRegressor()
    model.fit(x_train, y_train)                                            

    pickle.dump(model, open(filename, 'wb'))