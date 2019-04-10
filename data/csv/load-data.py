import csv
import sys
import urllib2
from contextlib import closing
import pandas as pd
#
# error check for arguments
#
if len(sys.argv) < 2:
    print 'Need to provide number of tuples for datasets '\
          'on the command line!'
    sys.exit(1)  # abort because of error

tuples = int(sys.argv[1])
dividend = open('scripts/csv_recordcount.txt').readlines()
dividends = [line[:-1] for line in dividend]
dividends = map(int, dividends)
dividends = [x/tuples for x in dividends]
#
# finds a dividend from the recordcount file to output correct number of tuples
#
URLs = open('scripts/source-urls.txt', 'r')
file = open('scripts/outputdirtest.txt', 'r').readlines()
fileList = [line[:-1] for line in file]

pageNumber = 0

# opens the csv file from the URL and writes to a new csv file in our directory

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
