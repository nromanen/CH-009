import cgi, json
import psycopg2, sys, os

postInputs = cgi.FieldStorage()

sys.stdout.write("Content-type: text/html \r\n\r\n")

conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='root'")

cur = conn.cursor()

if postInputs['fetchType'].value == "1":
	cur.execute("SELECT * FROM orders")
	result =cur.fetchall()
	i=0
	arJSON=[]
	while i<len(result):
		arJSON.append(dict({"firstName":result[i][1], "lastName":result[i][2], "address":result[i][3]}))
		i +=1

	sys.stdout.write(json.dumps(arJSON))

conn.commit()
cur.close()
conn.close()
