import csv
import sys
import urllib2
from sympy.solvers import solve
from sympy import Symbol
from contextlib import closing
import pandas as pd
import urllib
#
# opens data from csvRecordCount.txt which contains the number of
# records for every csv file since January 2016,
#
#
# sourceURLs and outputFiles is our master list of data sources and the
# directory structure of our data
#
URLs = open('../tests/sources.txt', 'r')

count = int(1)
id = 0
pageNumber = 0
initial = True;

for line in URLs:

    response = urllib2.urlopen('https://s3.amazonaws.com/nyc-tlc/trip+data/yellow_tripdata_2017-01.csv');
    data = pd.read_csv(response);

    strippedcolumn = ['RatecodeID', 'VendorID', 'store_and_fwd_flag', 'payment_type', 'dropoff_zone', 'pickup_zone']

    for columns in strippedcolumn:
        if columns in data:
            data = data.drop(columns, axis=1)

    data['tripID'] = count
    rownumber = 0

    for index, row in data.iterrows():
        if (rownumber % 50 == 0):
            data.set_value(index, 'tripID', count)
            count += 1
        rownumber = rownumber + 1

    data_reordered = ['tripID', 'tpep_pickup_datetime', 'tpep_dropoff_datetime', 'trip_distance', 'total_amount', 'PULocationID', 'DOLocationID']
    data = data.reindex(columns = data_reordered)

    if initial:
        with open('./yellow_tripdata.csv', 'w') as f:
            data.to_csv(f, index=False);
        initial = False

    with open('./yellow_tripdata.csv', 'a') as f:
        data.to_csv(f, index=False, header=False);

# opens csv file from URL and writes to a new csv file in our directory with number of
# records specified.
