import csv
import os
import sys
import urllib2
from contextlib import closing
import pandas as pd
import numpy as np

#os.environ["GOOGLE_API_KEY"] = 'AIzaSyBHIDOmlFDBhq3ERfSMqJ321GuYxUgpmdM'
#GOOGLE_API_KEY = 'AIzaSyBHIDOmlFDBhq3ERfSMqJ321GuYxUgpmdM'
from pygeocoder import Geocoder



file = open('../tests/output.txt', 'r').readlines()
fileList = [line[:-1] for line in file]

for files in fileList:

    data = pd.read_csv(files, encoding='utf-8-sig')

    data = data[['pickup_longitude','pickup_latitude', 'dropoff_latitude', 'dropoff_longitude']]
    print(data.dtypes)

    results = Geocoder('AIzaSyBHIDOmlFDBhq3ERfSMqJ321GuYxUgpmdM').reverse_geocode(data['pickup_latitude'][1], data['pickup_longitude'][10])
    print(results)
