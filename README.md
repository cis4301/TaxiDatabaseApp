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

To get up and running, download node.JS 10.x or higher from <https://nodejs.org>.

To run the app, go to root and type

    node .

packages may need to be installed with the '-s' option to populate your
npm_modules folder.

# Notes:
Credentials for both the VPN and Oracle database are currently set as environment
variables, but you can use your own to test it out.

## Data folders
In the data/csv directory there is a script called data.py which will extract all trip data
from 2016 to 2018.  Altogether, this is close to 50 GB of csv files!  Currently data.py condenses each
dataset to 3000 entries.  Be aware that running data.py could take upwards of an hour(!) to populate all three categories.
