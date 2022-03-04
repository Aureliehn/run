from services import add_pic_service, show_pic_service, filter_pic_service
from flask import Blueprint, request

pic_route = Blueprint("pic_route", __name__)

@pic_route.route("/api/pic/add_pic/", methods=["POST"])
def add_pic():
    """Function to add a new pic"""
    print("pic")
    data = request.get_json()
    return add_pic_service(data)

@pic_route.route("/api/pic/", methods=["GET"])
def show_pis():
    print("all pic")
    """Function to send pic informations under .json format"""
    return show_pic_service()

@pic_route.route("/api/filter/pic/<int:filtre>/", methods=["GET"])
def filter_pi(filtre):
    """Function to send pic informations under .json format"""
    return filter_pic_service(filtre)