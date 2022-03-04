from utils import db, ma
from datetime import datetime
from sqlalchemy.sql.sqltypes import Float
from sqlalchemy.orm import backref

class PIC(db.Model):

    __tablename__ = "pic"

    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    lat = db.Column(Float)
    lng = db.Column(Float)
    categorie = db.Column(db.String(255))

class PicSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "address",
            "lat",
            "lng",
            "categorie"
        )
        model = PIC()

pic_schema = PicSchema()
pics_schema = PicSchema(many = True)