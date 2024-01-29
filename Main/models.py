from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(50))
    alias = db.Column(db.String(50))
    story = db.Column(db.String(255))
    motivation = db.Column(db.String(255))