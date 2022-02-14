import pytest
from model import PointsInterets
from services import points_interets_service

@pytest.fixture
def pi():
    pi = PointsInterets(
        title = "point",
        content = "description du point",
        age = "primaire",
        creation_date = 10-10-2021,
        categorie = "Nature",
        lat = 46.77668,
        lng = 3.07722
    )

