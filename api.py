import flask
from flask import request, jsonify
import sqlite3

from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)


# app.config["DEBUG"] = True

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@app.route('/all', methods=['GET'])
def get_all():
    conn = sqlite3.connect('articles.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    articles = cur.execute('SELECT * FROM articles').fetchall()

    return jsonify(articles)


@app.route('/article/<article_id>')
def get_article(article_id):
    conn = sqlite3.connect('articles.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    article = cur.execute('SELECT * FROM articles where id = ?', (article_id,)).fetchone()

    return jsonify(article)


app.run(host='0.0.0.0')
