from flask import make_response
from flask.json import jsonify
from utils import db
from model import Age, age_schema, ages_schema
import json


def show_ages_service():
    """Function to show all pi"""
    try:
        ages = db.session.query(Age).all()
        ages = ages_schema.dump(ages)
        print("age1", ages)
        db.session.close()
        return jsonify(ages)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def show_age_name_service(id):
    """Function to show all pi"""
    try:
        age = db.session.query(Age).filter(Age.id == id).first()
        age = age_schema.dump(age)
        age = age["name"]
        db.session.close()
        return jsonify(age)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

