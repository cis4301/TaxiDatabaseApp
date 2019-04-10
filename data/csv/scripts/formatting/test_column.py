import csv
import sys
import pandas as pd

count = int(1)
file = open('../tests/output1.txt', 'r').readlines()
fileList = [line[:-1] for line in file]

for files in fileList:

    data = pd.read_csv(files, encoding='utf-8-sig')

    if 'RatecodeID' in data:
        data = data.drop ('RatecodeID', axis=1)
    if 'VendorID' in data:
        data = data.drop ('VendorID', axis=1)
    if 'store_and_fwd_flag' in data:
        data = data.drop ('store_and_fwd_flag', axis=1)
    if 'payment_type' in data:
        data = data.drop ('payment_type', axis=1)
    if 'dropoff_zone' in data:
        data = data.drop ('dropoff_zone', axis=1)
    if 'pickup_zone' in data:
        data = data.drop ('pickup_zone', axis=1)


    if 'dropoff_latitude' not in data:
        data['dropoff_latitude'] = 0
    if 'dropoff_longitude' not in data:
        data['dropoff_longitude'] = 0
    if 'pickup_latitude' not in data:
        data['pickup_latitude'] = 0
    if 'pickup_longitude' not in data:
        data['pickup_longitude'] = 0
    if 'tripID' not in data:
        data['tripID'] = count
    if 'PULocationID' not in data:
        data['PULocationID'] = 0
    if 'DOLocationID' not in data:
        data['DOLocationID'] = 0


    data_order = ['tripID', 'tpep_pickup_datetime', 'tpep_dropoff_datetime', 'passenger_count', 'trip_distance', 'pickup_longitude', 'pickup_latitude', 'dropoff_longitude', 'dropoff_latitude', 'fare_amount', 'extra', 'mta_tax', 'tip_amount', 'tolls_amount', 'improvement_surcharge', 'total_amount', 'PULocationID', 'DOLocationID']
    data = data.reindex(columns = data_order)
    data.to_csv(files, index=False)
