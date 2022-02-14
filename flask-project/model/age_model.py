from utils import db, ma


class Age(db.Model):
    """Class for Age's attributes and methods"""

    __tablename__ = "Age"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(
        db.String(50)
    )


class AgeSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        fields = (
            "id",
            "name"
            )
        model = Age()


age_schema = AgeSchema()
ages_schema = AgeSchema(many=True)
