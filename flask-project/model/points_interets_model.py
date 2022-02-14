from utils import db, ma
from datetime import datetime
from sqlalchemy.sql.sqltypes import Float
from sqlalchemy.orm import backref
from .age_model import AgeSchema 
from .categorie_model import CategorieSchema 

class PointsInterets(db.Model):
    """Class for point's attributes and methods"""

    __tablename__ = "pI"

    id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    age_id = db.Column(
        db.Integer, db.ForeignKey("Age.id"), nullable=False
    )
    categorie_id = db.Column(
        db.Integer, db.ForeignKey("Categorie.id"), nullable=False
    )
    title = db.Column(db.String(255))
    content = db.Column(db.String)
    creation_date = db.Column(db.Date, nullable=False, default=datetime.now)
    lat = db.Column(Float)
    lng = db.Column(Float)

    age = db.relationship(
        "Age", backref=backref("pI", lazy="joined"), lazy="joined"
    )
    categorie = db.relationship(
        "Categorie", backref=backref("pI", lazy="joined"), lazy="joined"
    )

class PointsInteretsSchema(ma.Schema):
    """Schema used to serialize data"""
    class Meta:
        fields = (
            "id",
            "title",
            "content",
            "age",
            "creation_date",
            "categorie",
            "lat",
            "lng",
        )
        model = PointsInterets()

    age = ma.Nested(AgeSchema)
    categorie = ma.Nested(CategorieSchema)

pointsInterets_schema = PointsInteretsSchema()
pointssInterets_schema = PointsInteretsSchema(many=True)
