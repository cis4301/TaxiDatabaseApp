# CIS4301Taxis

This is the boilerplate for a RESTful Oracle database application.

# Requirements:



Cisco VPN for Node.js:

    npm i cisco-vpn

Oracle DB plugin:

    npm i oracledb

Morgan for debugging

    npm morgan

# Installation

To get up and running download node.JS 10.x or higher from nodejs.org.

From the app's root directory, type:

    npm install
   
to install all your dependencies, then

    grunt

to start the server on localhost:3000.

To run the app, navigate to 

    $~/TaxiDatabaseApp/angular/
    
then,

    ng serve

to run app on localhost:4200.

## Python

There are quite a few dependencies for the python scripts.  At  the minimum you will need to install
Python 2.7.x or higher [here](https://www.python.org/downloads/)

Most of the scripts use pandas for csv file reading

    pip install pandas

Other sources include urllib2, shapely and pyproj

    pip install urllib2
    pip install shapely
    pip install pyproj


# Data

## Loading Data

There is a script to download all the Taxi Commission data from 2016 to the present and place it in your data/ folder.  Since the datasets are prohibitively large, you can specify how many tuples you want from each set.  Navigate to data/csv and type:

    python ./load-data.py  N
    
where N is the number of tuples.  There are 90 datasets in total so even choosing N to be 10,000 will give around one million tuples.

## Data Scripts

data/csv contains a few other scripts that can help make the datasets easier to import into Oracle.
Running the following:

    python ./format_columns.py
    
will strip unused columns and add a tripID field.  You should run this right after loading the data to enumerate 
everything correctly.

    python ./pyshape.py
    
in the scripts/geocoding directory will take all coordinate location data and translates them to zone numbers.
It then adds these fields to the original data file.

All the scripts use outputdir.txt and source-urls.txt to know where to place and retrieve data respectively.  The tests/ 
folder is just leftover debugging stuff.  

### Misc

The file csv_recordcount.txt in data/csv/scripts contains a record count for every dataset.  The number of records range from one to ten million.  These follow the ordering in source-urls.txt

# Notes:
Credentials for both the VPN and Oracle database are currently set as environment
variables.

