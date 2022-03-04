from flask import make_response
from flask.json import jsonify
from utils import db
from model import PIC, pics_schema, pic_schema
import json

def add_pic_service(pic_data):
    """Function to add a new pic"""
    try:
        new_pic = PIC(**pic_data)
        db.session.add(new_pic)
        db.session.commit()
        return pic_schema.dump(new_pic)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({'message': str(e)}, 404)

def show_pic_service():
    """Function to show all pic"""
    try:
        pic = db.session.query(PIC).all()
        pic = pics_schema.dump(pic)
        db.session.close()
        return jsonify(pic)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)