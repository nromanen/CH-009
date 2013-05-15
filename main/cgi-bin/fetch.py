import cgi, json
import psycopg2, sys, os

form = cgi.FieldStorage()

sys.stdout.write("Content-type: text/html \r\n\r\n")
conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='Syslick1'")
cur = conn.cursor()

if 1 == 1:
	cur.execute("SELECT * FROM materials")

	rez =cur.fetchall()
	i=0
	arJSON=[]
#	print(json.dumps(arJSON))
	while i<len(rez):
		arJSON.append(dict({"material":rez[i][1], "price":float(rez[i][2])}))
		
		i +=1

sys.stdout.write(json.dumps(arJSON))
conn.commit()
cur.close()
conn.close()