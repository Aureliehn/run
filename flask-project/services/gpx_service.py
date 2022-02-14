from flask import make_response
from flask.json import jsonify
from utils import db
from model import Gpx, gpx_schema, gpxs_schema
# from gpx_converter import ConverterConverter(input_file = your_input_file).gpx_to_json(output_file=your_output_file

def add_gpx_service(gpx_data):
    """Function to add a new ticket"""
    try:
        new_gpx = Gpx(**gpx_data)
        db.session.add(new_gpx)
        db.session.commit()
        return gpx_schema.dump(new_gpx)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({'message': str(e)}, 404)