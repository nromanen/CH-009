import cgi, json
import psycopg2, sys, os

postInputs = cgi.FieldStorage()

sys.stdout.write("Content-type: text/html \r\n\r\n")
<<<<<<< HEAD

=======
>>>>>>> 4158bf377d3e2df33970b86a1c9955bb9971acb9

conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='root'")

cur = conn.cursor()

if postInputs['fetchType'].value == "1":
	cur.execute("SELECT * FROM materials")
	result =cur.fetchall()
	i=0
	arJSON=[]
	while i<len(result):
		arJSON.append(dict({"material":result[i][1], "price":float(result[i][2])}))
		i +=1

	sys.stdout.write(json.dumps(arJSON))

if postInputs['fetchType'].value == "2":
	cur.execute("SELECT * FROM units")

	result =cur.fetchall()
	i=0
	arJSON=[]
	
	
	while i<len(result):
		arJSON.append(dict({"name":result[i][1], "mcollection":result[i][2]}))
		i +=1

	sys.stdout.write(json.dumps(arJSON))

if postInputs['fetchType'].value == "3":
	cur.execute("SELECT * FROM products")

	result =cur.fetchall()
	i=0
	arJSON=[]
	
	
	while i<len(result):
		arJSON.append(dict({"nameG":result[i][1], "goodsCollection":result[i][2]}))
		i +=1

	sys.stdout.write(json.dumps(arJSON))


conn.commit()
cur.close()
conn.close()