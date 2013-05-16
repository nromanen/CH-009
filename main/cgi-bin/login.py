import cgi
import psycopg2, sys, os




postInputs = cgi.FieldStorage()

sys.stdout.write("Content-type: text/html \r\n\r\n")
conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='Syslick1'")
cur = conn.cursor()
cur.execute("SELECT * FROM peple WHERE username='"+postInputs['login'].value+"' AND password='"+postInputs['password'].value+ "';")
result =cur.fetchall()
sys.stdout.write(result[0][3])
conn.commit()
cur.close()
conn.close()