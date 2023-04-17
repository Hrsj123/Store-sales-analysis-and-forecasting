from sklearn.neighbors import KNeighborsRegressor
import pickle
import os

filename = os.path.join('..', 'models', 'knn_model.sav')

def random_forest_algorithm(x_train, y_train):
    model = KNeighborsRegressor()
    model.fit(x_train, y_train)                                            

    pickle.dump(model, open(filename, 'wb'))