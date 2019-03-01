import csv
import sys
import urllib2
from contextlib import closing
import pandas as pd
#
# opens data from csvRecordCount.txt which contains the number of
# records for every csv file since January 2016,
#
if len(sys.argv) < 2:
    print 'Need to provide number of tuples for datasets '\
          'on the command line!'
    sys.exit(1)  # abort because of error

tuples = int(sys.argv[1])
dividend = open('scripts/csvRecordCount.txt').readlines()
dividends = [line[:-1] for line in dividend]
dividends = map(int, dividends)
dividends = [x/tuples for x in dividends]
#
# sourceURLs and outputFiles is our master list of data sources and the
# directory structure of our data
#
URLs = open('scripts/sourceURLs.txt', 'r')
file = open('scripts/outputFiles.txt', 'r').readlines()
fileList = [line[:-1] for line in file]

pageNumber = 0

# opens csv file from URL and writes to a new csv file in our directory with number of
# records specified.

for line in URLs:
    url = line
    response = urllib2.urlopen(url)
    infile = response
    count = 0
    with closing(response) as infile:
        with open(fileList[pageNumber], 'w+') as outfile:
            reader = csv.DictReader(infile)
            writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames, extrasaction = 'ignore')
            writer.writeheader()

            for row in reader:
                count += 1
                if not count % dividends[pageNumber]:
                    writer.writerow(row)
    pageNumber += 1
