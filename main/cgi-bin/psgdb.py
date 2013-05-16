import cgi
import psycopg2, sys, os

form = cgi.FieldStorage()

conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='root'")

cur = conn.cursor()
cur.execute("DROP TABLE IF EXISTS peple, materials, units, products")
cur.execute("CREATE TABLE peple ( id SERIAL PRIMARY KEY, username varchar(30), password varchar, permition varchar(50));")
cur.execute("CREATE TABLE materials ( id SERIAL PRIMARY KEY, nameMaterial varchar, priceMaterial int);")
cur.execute("CREATE TABLE units ( id SERIAL PRIMARY KEY, nameUnits varchar, collectionMaterials text);")
cur.execute("CREATE TABLE products ( id SERIAL PRIMARY KEY, nameProducts varchar, collectionUnists text);")
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Storekeeper','1','storekeeper'))
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Engineer','1','engineer'))
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Accountant','1','accauntant'))
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Customer','1','customer'))
#cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",("'"+form['username'].value+"'",/
#	"'"+form['password'].value+"'","'"+form['permition'].value+"'"))


conn.commit()
cur.close()
conn.close()