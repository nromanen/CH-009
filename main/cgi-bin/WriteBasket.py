import cgi, json
import psycopg2, sys, os


order = cgi.FieldStorage() 
sys.stdout.write("Content-type: text/html \r\n\r\n")

conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='root' ")

cur = conn.cursor()

cur.execute("INSERT INTO orders (firstName, lastName, address, products) VALUES (%s, %s, %s, %s);",(order['firstName'].value, order['lastName'].value, order['address'].value, order['products'].value))

sys.stdout.write("All done!")

conn.commit()
cur.close()
conn.close()
