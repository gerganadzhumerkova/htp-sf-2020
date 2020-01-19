import sqlite3
import flask
from flask import request, jsonify

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
    conn.enable_load_extension(True)
    conn.load_extension("./db_files/libsqlitefunctions.dylib")

    cur = conn.cursor()

    articles = cur.execute('SELECT * FROM articles_with_score').fetchall()
    conn.enable_load_extension(False)

    return jsonify(articles)


@app.route('/article/<article_id>')
def get_article(article_id):
    conn = sqlite3.connect('articles.db')
    conn.row_factory = dict_factory
    conn.enable_load_extension(True)
    conn.load_extension("./db_files/libsqlitefunctions.dylib")
    cur = conn.cursor()

    article = cur.execute('SELECT * FROM articles_with_score WHERE id = ?', (article_id,)).fetchone()
    conn.enable_load_extension(False)

    return jsonify(article)


@app.route('/article/vote', methods=['POST'])
def article_vote():
    article_id = request.args.get('articleId')
    vote = request.args.get('vote')

    conn = sqlite3.connect('articles.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    if vote == 'UP':
        sql = 'UPDATE articles set number_upvotes = number_upvotes + 1 WHERE id = ?'
    else:
        sql = 'UPDATE articles set number_downvotes = number_downvotes + 1 WHERE id = ?'

    cur.execute(sql, (article_id,))

    conn.commit()
    cur.close()

    return jsonify('OK')


@app.route('/article/buy', methods=['POST'])
def article_buy():
    article_id = request.args.get('articleId')

    conn = sqlite3.connect('articles.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    cur.execute('UPDATE articles set number_purchased = number_purchased + 1 WHERE id = ?', (article_id,))

    conn.commit()
    cur.close()

    return jsonify('OK')


app.run(host='0.0.0.0')
