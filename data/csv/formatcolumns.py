import csv
import sys
import pandas as pd

count = int(1)
file = open('tests/output.txt', 'r').readlines()
fileList = [line[:-1] for line in file]

for files in fileList:

    data = pd.read_csv(files, encoding='utf-8-sig')

    if {'VendorID', 'RatecodeID', 'store_and_fwd_flag'}.issubset(data.columns):
        data = data.drop(['VendorID', 'RatecodeID', 'store_and_fwd_flag'], axis=1)

    data['tripID'] = count

    for index, row in data.iterrows():

        data.set_value(index, 'tripID', count)
        count += 1

    data.to_csv(files, index=False)
