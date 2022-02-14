from services import show_ages_service,show_age_name_service
from flask import Blueprint, request

age_route = Blueprint("age_route", __name__)

@age_route.route("/api/ages/", methods=["GET"])
def show_ages():
    """Function to send pis informations under .json format"""
    return show_ages_service()

@age_route.route("/api/age/<int:id>/", methods=["GET"])
def show_age_n(id):
    """Function to send pis informations under .json format"""
    return show_age_name_service(id)