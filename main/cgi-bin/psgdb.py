import cgi
import psycopg2, sys, os

form = cgi.FieldStorage()

conn = psycopg2.connect("dbname='test' user='root' host='localhost' password='test'")

cur = conn.cursor()
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",("'"+form['username'].value+"'",/
	"'"+form['password'].value+"'","'"+form['permition'].value+"'"))


conn.commit()
cur.close()
conn.close()