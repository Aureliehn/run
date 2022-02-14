# from services import deconnexion_service, login_service
# from flask import Blueprint, request

# user_route = Blueprint("user_route", __name__)

# @user_route.route("/api/user/registration", methods=["POST"])
# def registration():
#     print("inscription")
#     data = request.get_json()
#     return new_user_service()

# @user_route.route("/user/login", methods=["POST"])
# def login():
#     """Get the login request with user infos and check if the user exists in bdd. Return True if the connexion succeed"""
#     user = request.get_json()
#     return login_service(user)

# @user_route.route("/logout")
# def logout():
#     """Clear session data"""
#     return deconnexion_service()


# @user_route.route("/logged_in", methods=["GET"])
# def is_connected():
#     """Return True if the user is loggued. Just get the state of the user"""
#     return is_connected_service()