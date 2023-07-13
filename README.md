# Store-sales-analysis-and-forecasting
Primarily, this project is deisgined to use various ML algorithms to predict the weekly sales profit for a given input week based upon the training dataset. The output of this prediction, comes with the revenue_value along with its accuracy metrics and a sactter plot to depict its general accuracy!<br />
We can also use the add_product or add_dataset endpoints to either add slowly accumulating data which at the end of each week is aggregated to calculate each week's sales_profit value, or we can just add a single dataset of weekly sales_profit directly!<br />
• One key adventage of this project is that the model continuously improves and retrained based on new data entries (Disadvantage: The dataset may soon turn very large and time consuming process in real use case).<br />

## Django
Backend api server and database(default sqlite) <br /><br />
• To start the backend server:
> python manage.py runserver

### Celery
To aggregate the weekly sales_data <br />
To use aggregation functionality<br /><br />
• First install "Erlang"(required for RabbitMQ) and then, "RabbitMQ-Server"(A task queue)<br />
• Basic requirements- Open 2 new terminals with each running the following commands: 
> celery -A back_end worker -l info --pool=solo     
> celery -A core beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler

### ML
To predict the sales value for a particular date using various ML algorithms <br />
• Used "sci-kit learn"(sklearn) and "xgboost" packages

## React
Frontend framework used along with Django <br />
• To start the frontend server:
> npm start
