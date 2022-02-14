from services import show_categories_service, show_categorie_name_service
from flask import Blueprint, request

categorie_route = Blueprint("categorie_route", __name__)

@categorie_route.route("/api/categories/", methods=["GET"])
def show_categories():
    """Function to send pis informations under .json format"""
    return show_categories_service()
@categorie_route.route("/api/categorie/<int:id>/", methods=["GET"])
def show_categorie_n(id):
    """Function to send pis informations under .json format"""
    return show_categorie_name_service(id)