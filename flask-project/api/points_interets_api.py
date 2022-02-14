from numpy import integer
from services import add_pi_service, show_pis_service, filter_pi_service, show_pi_service
from flask import Blueprint, request

pi_route = Blueprint("pi_route", __name__)

@pi_route.route("/api/pi/add_pi/", methods=["POST"])
def add_pi():
    """Function to add a new pi"""
    print("hello")
    data = request.get_json()
    return add_pi_service(data)

@pi_route.route("/api/pis/", methods=["GET"])
def show_pis():
    print("hello")
    """Function to send pis informations under .json format"""
    return show_pis_service()

@pi_route.route("/api/filter/pis/<int:filtre>/<int:age>/", methods=["GET"])
def filter_pi(filtre: integer, age: integer):
    """Function to send pis informations under .json format"""
    print("hi")
    return filter_pi_service(filtre, age)

@pi_route.route("/api/pi/<int:id>/", methods=["GET"])
def show_detail_pi(id):
    """Function to send pis informations under .json format"""
    print("detail")
    return show_pi_service(id)



