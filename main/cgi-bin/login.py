import cgi
import psycopg2, sys, os




form = cgi.FieldStorage()

sys.stdout.write("Content-type: text/html \r\n\r\n")
conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='root' port='5432'")
cur = conn.cursor()
cur.execute("SELECT * FROM peple WHERE username='"+form['login'].value+"' AND password='"+form['password'].value+ "';")
rez =cur.fetchall()
sys.stdout.write(rez[0][3])
conn.commit()
cur.close()
conn.close()