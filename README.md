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

To run the app, go to root and type

    node .

packages may need to be installed with '-s' option to populate your
npm_modules folder

## Data Loading

There is a script in data/csv that will automatically download all the Taxi Commission data from 2016 to the present.  Since the datasets are prohibitively large, you can specify how many tuples you want from each set.  Navigate to data/csv and type:

    python ./load-data.py  N
    
where N is the size you want.  There are 90 datasets in total so even choosing N to be 10,000 will give around one million tuples.

### Data Scripts

data/csv contains a few other scripts that can help make the datasets easier to import into Oracle.
Running the following:

    python ./add_keyvalue.py
    
will add a keyvalue field to the specified data.  

All the scripts use outputdir.txt and source-urls.txt to know where to place and retrieve data respectively.  The tests/ 
folder is just leftover debugging stuff.  

### Misc

The file csv_recordcount.txt in data/csv/scripts has a list of sizes for every dataset.  The number of records range from one to ten
million.  These correspond to the datasets in source-urls.txt

# Notes:
Credentials for both the VPN and Oracle database are currently set as environment
variables.

