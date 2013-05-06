import cgi
import psycopg2, sys, os




form = cgi.FieldStorage()


#password = loginDate['password'].value

sys.stdout.write("Content-type: text/html \r\n\r\n")

sys.stdout.write("engenir")
sys.stdout.write("asd "+form['login'].value)
sys.stdout.write("||"+form['password'].value)

	

#conn = psycopg2.connect("dbname='test' user='root' host='localhost' password='test'")

#cur = conn.cursor()
#cur.execute("CREATE TABLE test (id serial PRIMARY KEY, num integer, data varchar);")
#cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)",(100, "abc'def"))
#cur.execute("SELECT * FROM test;")
#cur.fetchone()
#conn.commit()
#cur.close()
#conn.close()