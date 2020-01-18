import flask
from flask import request, jsonify
import sqlite3


app = flask.Flask(__name__)
#app.config["DEBUG"] = True

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@app.route('/all', methods=['GET'])
def home():
  conn = sqlite3.connect('articles.db')
  conn.row_factory = dict_factory
  cur = conn.cursor()
  
  articles = cur.execute('SELECT * FROM articles').fetchall()

  return jsonify(articles)

app.run(host='0.0.0.0')
