import cgi, json
import psycopg2, sys, os

form = cgi.FieldStorage()

sys.stdout.write("Content-type: text/html \r\n\r\n")
conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='Syslick1'")
cur = conn.cursor()

if form['fetchType'].value == "1":
	cur.execute("SELECT * FROM materials")
	rez =cur.fetchall()
	i=0
	arJSON=[]
	while i<len(rez):
		arJSON.append(dict({"material":rez[i][1], "price":float(rez[i][2])}))
		i +=1

	sys.stdout.write(json.dumps(arJSON))

if form['fetchType'].value == "2":
	cur.execute("SELECT * FROM units")

	rez =cur.fetchall()
	i=0
	arJSON=[]
	
	
	while i<len(rez):
		arJSON.append(dict({"name":rez[i][1], "mcollection":rez[i][2]}))
		i +=1

	sys.stdout.write(json.dumps(arJSON))

if form['fetchType'].value == "3":
	cur.execute("SELECT * FROM products")

	rez =cur.fetchall()
	i=0
	arJSON=[]
	
	
	while i<len(rez):
		arJSON.append(dict({"nameG":rez[i][1], "goodsCollection":rez[i][2]}))
		i +=1

	sys.stdout.write(json.dumps(arJSON))


conn.commit()
cur.close()
conn.close()