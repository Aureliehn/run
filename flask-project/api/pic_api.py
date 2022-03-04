from services import add_pic_service, show_pic_service
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
    """Function to send pis informations under .json format"""
    return show_pic_service()