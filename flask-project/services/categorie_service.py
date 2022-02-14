from flask import make_response
from flask.json import jsonify
from utils import db
from model import Categorie, categories_schema,categorie_schema
import json


def show_categories_service():
    """Function to show all pi"""
    try:
        categories = db.session.query(Categorie).all()
        categories = categories_schema.dump(categories)
        db.session.close()
        return jsonify(categories)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def show_categorie_name_service(id):
    """Function to show all pi"""
    try:
        categorie = db.session.query(Categorie).filter(Categorie.id == id).first()
        categorie = categorie_schema.dump(categorie)
        categorie = categorie["name"]
        db.session.close()
        return jsonify(categorie)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)