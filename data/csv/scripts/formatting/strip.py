import csv
import sys
import pandas as pd

count = int(1)
file = open('../tests/output1.txt', 'r').readlines()
fileList = [line[:-1] for line in file]

for files in fileList:

    data = pd.read_csv(files, encoding='utf-8-sig')

    strippedcolumn = ['RatecodeID', 'VendorID', 'store_and_fwd_flag', 'payment_type', 'dropoff_zone', 'pickup_zone']
    geocoordinates = ['dropoff_latitude', 'dropoff_longitude', 'pickup_latitude', 'pickup_longitude']

    for columns in strippedcolumn:
        if columns in data:
            data = data.drop(columns, axis=1)

    for columns in geocoordinates:
        if columns not in data:
            data[columns] = 0

    data['tripID'] = count
    data['PULocationID'] = 256
    data['DOLocationID'] = 256


    data_reordered = ['tripID', 'tpep_pickup_datetime', 'tpep_dropoff_datetime', 'passenger_count', 'trip_distance', 'pickup_longitude', 'pickup_latitude', 'dropoff_longitude', 'dropoff_latitude', 'fare_amount', 'extra', 'mta_tax', 'tip_amount', 'tolls_amount', 'improvement_surcharge', 'total_amount', 'PULocationID', 'DOLocationID']

    data = data.reindex(columns = data_reordered)
    data.to_csv(files, index=False)
