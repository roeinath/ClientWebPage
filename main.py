from flask import Flask, render_template
from flask_cors import CORS, cross_origin
import json

CONF_FILE = 'customization.conf'

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})

@app.route('/foo')#, methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def foo():
    return request.json['inputVar']

@app.route("/")
def hello_world():
    with open(CONF_FILE, 'r') as conf_file:
        conf_dict = json.load(conf_file)
    return render_template('index.html', **conf_dict)
