# from datetime import datetime
# from qcluster import schedule

# def add_week_data_task():
#     # use all the data from walmart sales -> process that weeks's sales -> store it into walmart store
#     # empty out walmart sales db
#     # run ml model training
#     pass

# schedule('market_analysis.tasks.add_week_data_task', repeat=60 * 60 * 24 * 7, schedule_type='W', repeats=-1, next_run=datetime.now().replace(hour=0, minute=0, second=0, microsecond=0, weekday=0))