import cgi
import psycopg2, sys, os

form = cgi.FieldStorage()

conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='Syslick1'")

cur = conn.cursor()
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Sotrekeeper','1','storekeeper'))
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Engineer','1','engineer'))
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Accountant','1','accauntant'))
cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('Customer','1','customer'))
#cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",("'"+form['username'].value+"'",/
#	"'"+form['password'].value+"'","'"+form['permition'].value+"'"))


conn.commit()
cur.close()
conn.close()