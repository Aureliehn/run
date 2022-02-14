from flask import make_response
from flask.json import jsonify
from utils import db
from model import PointsInterets, pointssInterets_schema, pointsInterets_schema
import json

def add_pi_service(pi_data):
    """Function to add a new ticket"""
    try:
        new_pi = PointsInterets(**pi_data)
        db.session.add(new_pi)
        db.session.commit()
        return pointsInterets_schema.dump(new_pi)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({'message': str(e)}, 404)

def show_pis_service():
    """Function to show all pi"""
    try:
        pis = db.session.query(PointsInterets).all()
        pis = pointssInterets_schema.dump(pis)
        print(pis)
        db.session.close()
        return jsonify(pis)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def show_pi_service(id):
    """Function to show all pi"""
    try:
        pi = db.session.query(PointsInterets).filter(PointsInterets.id == id).first()
        pi = pointsInterets_schema.dump(pi)
        print(pi, "detail")
        db.session.close()
        return jsonify(pi)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def filter_pi_service(filtre, age):
    """Function to filter pi"""
    # print(filtre, "filtre")
    # print("typr filtre", type(filtre))


    # cat = db.session.query(PointsInterets.categorie).all()
    # print(cat)
    # print("type cat", type(cat))
    # exit()
    try:
        # pi= db.session.query(PointsInterets).filter(PointsInterets.categorie_id == filtre).all()
        pi = db.session.query(PointsInterets).filter((PointsInterets.categorie_id == filtre) and (PointsInterets.age_id == age)).all()
        # pi = db.session.query(PointsInterets).filter(PointsInterets.age == filtre)
        # select * from "pI" where categorie = 'nature' AND age ='primaire'
        pi = pointssInterets_schema.dump(pi)
        db.session.close()
        return jsonify(pi)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

