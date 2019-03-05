import shapefile
import pandas as pd
from shapely.geometry import Point
from shapely.geometry import shape
from shapely.geometry import Polygon
from pyproj import Proj
from pyproj import transform


# Set the projection parameters, shape file is projected to EPSG:2263
# GPS data is EPSG:4326
inProj = Proj("+init=EPSG:4326")
outProj = Proj("+init=EPSG:2263", preserve_units=True)
# Load our shape files
point = Point(float(-73.9485855102539),float(40.78908920288085))
myshp = open("taxi_zones/taxi_zones.shp", "rb")
mydbf = open("taxi_zones/taxi_zones.dbf", "rb")
myprj = open("taxi_zones/taxi_zones.prj", "rb")
mysbn = open("taxi_zones/taxi_zones.sbn", "rb")
mysbx = open("taxi_zones/taxi_zones.sbx", "rb")
myshx = open("taxi_zones/taxi_zones.shx", "rb")
myshpxml = open("taxi_zones/taxi_zones.shp.xml", "rb")
polygon = shapefile.Reader(shp=myshp, dbf=mydbf, prj=myprj, sbn=mysbn, sbx=mysbx, shx=myshx, shpuml=myshpxml)
records = polygon.records()
polygons = polygon.shapes()


count = 0
file = open('../tests/output.txt', 'r').readlines()
fileList = [line[:-1] for line in file]
for files in fileList:
    data = pd.read_csv(files, encoding='utf-8-sig')
    for index, row in data.iterrows():


        pickup_point = (data.at[index, 'pickup_longitude'], data.at[index, 'pickup_latitude'])
        dropoff_point = (data.at[index, 'dropoff_longitude'], data.at[index, 'dropoff_latitude'])
        pickup_point = transform(inProj, outProj, pickup_point[0], pickup_point[1])
        dropoff_point = transform(inProj, outProj, dropoff_point[0], dropoff_point[1])
        print "row ", count
        count += 1

        for i in range(len(polygons)):
            boundary = polygons[i]
            name = records[i][0]
            if Point(pickup_point).within(shape(boundary)):
                data.at[index, 'pickup_zone'] = name
            if Point(dropoff_point).within(shape(boundary)):
                data.at[index, 'dropoff_zone'] = name


    data.to_csv(files, index=False)
