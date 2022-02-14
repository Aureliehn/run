from services import add_gpx_service
from flask import Blueprint, request

gpx_route = Blueprint("gpx_route", __name__)

@gpx_route.route("/api/gpx/add_gpx/", methods=["POST"])
def add_gpx():
    """Function to add a new gpx"""
    data = request.get_json()
    return add_gpx_service(data)