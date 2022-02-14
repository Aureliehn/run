from utils import db, ma

class User(db.Model):
    """Class for User's attributes and methods"""

    __tablename__ = "user"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )
    email = db.Column(
        db.String,
        unique=True, index=True
    )
    password = db.Column(db.String)



class UserSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        fields = (
            "id",
            "email",
            "password",
            )
        model = User()


user_schema = UserSchema()
users_schema = UserSchema(many=True)