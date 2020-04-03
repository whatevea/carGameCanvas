from flask import Flask,Response,request

import requests

app= Flask(__name__)

@app.route('/', defaults={'path': ''})

@app.route('/<path:path>')

def catch_all(path):

    return Response("<h1>Flask on Now</h1><p>You visited: /%s</p>" % (path), mimetype="text/html")

@app.route('/')

def nulljson():

	q=request.args.get('q')

	return findallepisode(q)

@app.route('/asd')

def findallepisode(name):

	headers={'Referer': 'http://vidstreaming.io', 'TE': 'Trailers', 'X-Requested-With': 'XMLHttpRequest'}

	r=requests.get('http://vidstreaming.io/ajax-search.html?keyword='+name,headers=headers).json()

	return r
app.run(debug=True)