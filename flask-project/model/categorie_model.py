from utils import db, ma


class Categorie(db.Model):
    """Class for Categorie's attributes and methods"""

    __tablename__ = "Categorie"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(
        db.String(50)
    )


class CategorieSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        fields = (
            "id",
            "name"
            )
        model = Categorie()


categorie_schema = CategorieSchema()
categories_schema = CategorieSchema(many=True)
