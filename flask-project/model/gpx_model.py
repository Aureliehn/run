from datetime import datetime
from utils import db, ma
from sqlalchemy import func
from sqlalchemy.types import UserDefinedType

class Geometry(UserDefinedType):
    def get_col_spec(self):
        return "GEOMETRY"
    def bind_expression(self, bindvalue):
        return func.ST_GeomFromText(bindvalue, type_=self)
    def column_expression(self, col):
        return func.ST_AsText(col, type_=self)
import io

class Gpx(db.Model):
    __tablename__ = "gpx"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    distance = db.Column(db.Integer)
    levelUp = db.Column(db.Integer)
    levelDown = db.Column(db.Integer)
    content = db.Column(db.String(550))
    # geom = db.Column(Geometry)

class gpxSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "distance",
            "levelUp",
            "levelDown",
            "content",
            # "geom"
        )
        model = Gpx()

gpx_schema = gpxSchema()
gpxs_schema = gpxSchema(many=True)