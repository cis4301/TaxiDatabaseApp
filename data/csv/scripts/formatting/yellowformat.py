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

count = int(1)
id = 0
pageNumber = 0
initial = True;
rownumber = int(1)

data = pd.read_csv('./yellow_tripdata.csv', encoding='utf-8-sig');

for index, row in data.iterrows():
    if (rownumber % 10 == 0):
        data.set_value(index, 'tripID', count)
        count += 1
    rownumber += 1
print(data.describe())

# opens csv file from URL and writes to a new csv file in our directory with number of
# records specified.
