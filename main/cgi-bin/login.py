import cgi
import psycopg2, sys, os




form = cgi.FieldStorage()


#password = loginDate['password'].value

sys.stdout.write("Content-type: text/html \r\n\r\n")

#sys.stdout.write("engenir")
#sys.stdout.write("asd "+form['login'].value)
#sys.stdout.write("||"+form['password'].value)

	

conn = psycopg2.connect("dbname='test' user='root' host='localhost' password='test'")

cur = conn.cursor()
#cur.execute("CREATE TABLE peple (id SERIAL, username varchar(30), password varchar, permition varchar(50));")
#cur.execute("INSERT INTO peple (username, password, permition) VALUES (%s, %s, %s);",('dima','12345','engenir'))
cur.execute("SELECT * FROM peple WHERE username='"+form['login'].value+"' AND password='"+form['password'].value+ "';")
rez =cur.fetchall()
sys.stdout.write(rez[0][3])
conn.commit()
cur.close()
conn.close()