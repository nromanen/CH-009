import cgi
import psycopg2, sys, os

form = cgi.FieldStorage()

sys.stdout.write("Content-type: text/html \r\n\r\n")
conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='Syslick1'")
cur = conn.cursor()

if 1 == 1:
	cur.execute("SELECT * FROM materials")
	rez =cur.fetchall()
	sys.stdout.write(str(rez))

conn.commit()
cur.close()
conn.close()