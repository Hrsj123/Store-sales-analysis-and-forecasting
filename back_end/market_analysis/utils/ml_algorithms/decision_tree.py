from sklearn.tree import DecisionTreeRegressor
import pickle
import os

filename = os.path.join('..', 'models', 'decision_tree_model.sav')

def decision_tree_algorithm(x_train, y_train):
    model = DecisionTreeRegressor()
    model.fit(x_train, y_train)                                            

    pickle.dump(model, open(filename, 'wb'))

