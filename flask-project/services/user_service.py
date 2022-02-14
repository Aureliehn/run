from flask import Flask ,request, session,make_response
from flask.json import jsonify
from utils import db
from model import User, user_schema
import json
import hashlib
import sqlalchemy as sa


def hash_password(password):
    return hashlib.sha256(str(password).encode("utf-8")).hexdigest()

def setup_route(app):
    # INSCRIPTION NOUVEL UTILISATEUR
    @app.route("/api/inscription", methods=["POST"])
    def new_user_service():
        try:
            user_data = request.json
            new_user = User(**user_data)
            db.session.add(new_user)
            db.session.commit()
            return user_schema.dump(new_user)
        except Exception as e:
            print(str(e))
            import traceback
            traceback.print_exc()
            return make_response({'message': str(e)}, 404)
        
    # CONNEXION
    @app.route("/api/user/login", methods=["POST"])
    def login_service():
        data = request.json

        try:
            data = user_schema.load(data)
            data["email"] = data["email"].lower()
            data["password"] = hash_password(data["password"])
        except Exception as e:
            return "erreur", 400
        user = (
        db.session.query(User)
            .filter(
                sa.and_(
                    User.email == data["email"],
                    User.password == data["password"],
            )
        )
        .first()
    )
        if user is not None:
            session["email"] = data["email"]
            session['id'] = user.id
            print("mot de passe hash => ", data["password"])
            db.session.close()
            return jsonify(True)
        else:
            db.session.close()
            return jsonify(False)

    # DECONNEXION
    @app.route("/api/logout", methods=["POST"])
    def deconnexion_service():
        session.clear()
        return ""

    # ESTCONNECTE
    @app.route("/api/logged_in", methods=["GET"])
    def is_connected_service():
        if "email" in session:
            return jsonify(True)
        else:
            return jsonify(False)