#!flask/bin/python
from flask import Flask, render_template, request, redirect, url_for, abort, session
import os
from os import path
import sys
import json
import random
import csv

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'some_really_long_random_string_here'
app.config['STORMPATH_API_KEY_FILE'] = 'apiKey.properties'
app.config['STORMPATH_APPLICATION'] = 'flaskr'

def readInData():
    data={}
    filepath = os.path.join(os.path.dirname(__file__), 'static/Dataset_S1_Human.csv')
    with open(filepath, "r") as csvFile:
        spamreader = csv.reader(csvFile, delimiter=',', quotechar='|')
        for row in spamreader:
            if row[0]!="Primary_Accession":
                key=row[0]
                if key not in data:
                    data[key]={}
                data[key]["Uncertainty"]=float(row[1])
                data[key]["Length"]=int(row[2])
                if row[3]=="NA":
                    data[key]["Disorder"]="NA"
                else:
                    data[key]["Disorder"] = float(row[3])
                data[key]["Compositional Bias"]=float(row[4])
                data[key]["Membrane"]=float(row[5])
    data=json.dumps(data)
    return data


@app.route('/')
def index():
    return render_template('base.html',
                           data=readInData())




if __name__ == '__main__':
    #readInData()
    app.run(debug=True)
