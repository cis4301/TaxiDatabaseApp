import csv
import sys
import pandas as pd

counter = 1
file = open('../tests/output.txt', 'r').readlines()
fileList = [line[:-1] for line in file]

for r in fileList:

    data = pd.read_csv(r, index_col = None)
    data['tripID'] = int(0)

    data.to_csv(r, index = "false")

    for i, row in data.iterrows():

        data.at[i, 'tripID'] = int(counter)
        counter += 1

    data.to_csv(r, index = "false")
