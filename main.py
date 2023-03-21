from flask import Flask, render_template
import json

CONF_FILE = 'customization.conf'

app = Flask(__name__)

@app.route("/")
def hello_world():
    with open(CONF_FILE, 'r') as conf_file:
        conf_dict = json.load(conf_file)
    return render_template('index.html', **conf_dict)
