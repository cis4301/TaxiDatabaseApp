import csv
import sys
import pandas as pd





data = pd.read_csv('./yellow_tripdata.csv', encoding='utf-8-sig')
print(data.describe())
