import cgi, json
import psycopg2, sys, os


postInputs = cgi.FieldStorage() 
sys.stdout.write("Content-type: text/html \r\n\r\n")


materials = json.loads(postInputs['materials'].value)
units = json.loads(postInputs['units'].value)
goods = json.loads(postInputs['goods'].value)
conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='root' port='5432'")


cur = conn.cursor()
cur.execute("DROP TABLE IF EXISTS materials, units, products")
cur.execute("CREATE TABLE materials ( id SERIAL PRIMARY KEY, nameMaterial varchar, priceMaterial numeric);")
cur.execute("CREATE TABLE units ( id SERIAL PRIMARY KEY, nameUnits varchar, collectionMaterials text);")
cur.execute("CREATE TABLE products ( id SERIAL PRIMARY KEY, nameProducts varchar, collectionUnists text);")

i=0
while i<len(materials):
	cur.execute("INSERT INTO materials (nameMaterial, priceMaterial) VALUES (%s, %s);",(materials[i]['material'], materials[i]['price']))
	i +=1

i=0
while i<len(units):
	cur.execute("INSERT INTO units  (nameUnits, collectionMaterials) VALUES (%s, %s);",(units[i]['name'], json.dumps(units[i]['mcollection'])))
	i +=1


i=0
while i<len(goods):

	cur.execute("INSERT INTO products (nameProducts, collectionUnists) VALUES (%s, %s);",(str(goods[i]['nameG']), json.dumps(goods[i]['goodsCollection'])))
	i +=1


sys.stdout.write(" All done!")

conn.commit()
cur.close()
conn.close()