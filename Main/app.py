from flask import Flask, render_template, request
from models import User, db
from flask_sqlalchemy.query import Query
from flask_sqlalchemy import SQLAlchemy

app15 = Flask(__name__)
app15.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hereo.db'
# db = SQLAlchemy(app15)

db.init_app(app15)

with app15.app_context():
    db.create_all()


app15.route()

@app15.route('/create')
def create():
    return render_template('createhero.html')


@app15.route('/crate_hereo', methods=['GET', 'POST'])
def create_hereo():
    if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        alias = request.form['alias']
        story = request.form['background-story']
        motivation = request.form['motivation']
        user = User(email=email, name=name, alias=alias, story=story, motivation=motivation)
        db.session.add(user)
        db.session.commit()
        return render_template('success.html')
    else:
        return 'hello'


if __name__ == '__main__':
    app15.run(port=5100, debug=True)
