import cgi, json
import psycopg2, sys, os


form = cgi.FieldStorage() 
sys.stdout.write("Content-type: text/html \r\n\r\n")
#sys.stdout.write(" Materials"+form['materials'].value+"<br><br>")
#sys.stdout.write("Units"+form['units'].value+"<br><br>")
sys.stdout.write("Goods"+form['goods'].value+"<br><br>")

materials = json.load(form['materials'].value)
units = json.load(form['units'].value)
goods = json.load(form['goods'].value) 
sys.stdout.write("asd" + materials)
conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='Syslick1'")
cur = conn.cursor()

conn.commit()
cur.close()
conn.close()