import time
from flask import Flask, render_template, request, url_for, redirect, jsonify, flash
from models import User, db
from flask_sqlalchemy.query import Query
from flask_sqlalchemy import SQLAlchemy
import base64
import random

app15 = Flask(__name__)
app15.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hereo.db'
# db = SQLAlchemy(app15)

db.init_app(app15)

with app15.app_context():
    db.create_all()


def get_hereos():
    return User.query.order_by(User.eol.desc()).all()


@app15.route('/')
def leaderboard():
    heroes = get_hereos()
    for heroe in heroes:
        if heroe.image:
            heroe.image = base64.b64encode(heroe.image).decode('utf-8')

    return render_template('leaderboard.html', hereos=heroes)


@app15.route('/accept', methods=['GET', 'POST'])
def accept():
    hero_1 = request.form['hero_id']
    hero_1 = User.query.filter_by(id=hero_1).first()
    ranked_heros = User.query.filter_by(rank=hero_1.rank).all()
    hero_2 = random.choice(ranked_heros)
    while hero_1 == hero_2:
        hero_2 = random.choice(ranked_heros)
    if hero_1.image:
        hero_1.image = base64.b64encode(hero_1.image).decode('utf-8')
    if hero_2.image:
        try:
            hero_2.image = base64.b64encode(hero_2.image).decode('utf-8')
        except:
            hero_2.image = None
    return render_template('accept_screen.html', hero_1=hero_1, hero_2=hero_2)


@app15.route('/create')
def create():
    return render_template('createhero.html')


@app15.route('/create_hereo', methods=['GET', 'POST'])
def create_hereo():
    if request.method == 'POST':
        try:
            picture = request.files['image']
            if picture:
                image_data = picture.read()
            email = request.form['email']
            name = request.form['name']
            alias = request.form['alias']
            story = request.form['background-story']
            motivation = request.form['motivation']
            user = User(email=email, name=name, alias=alias, story=story, motivation=motivation,
                        image_name=picture.filename, image=image_data, WINS=0)
            db.session.add(user)
            db.session.commit()
            users = User.query.all()
            for user in users:
                user.WINS = 0
                print(user.eol)
                if user.eol < 1400:
                    user.rank = 'RANK-C'
                    db.session.commit()
            return redirect(url_for('leaderboard'))
        except:
            return jsonify('this user already is created')
    else:
        return 'p'


@app15.route('/hero_profile', methods=['GET', 'POST'])
def hero_profile():
    if request.method == 'POST':
        hero_id = request.form['hero_id']
        user = User.query.filter_by(id=hero_id).first()
        if user.image:
            user.image = base64.b64encode(user.image).decode('utf-8')
        return render_template('stats2.html', user=user)


@app15.route('/fight', methods=['GET', 'POST'])
def fight():
    if request.method == 'POST':
        hero_1 = User.query.filter_by(id=request.form['hero1_id']).first()
        hero_2 = User.query.filter_by(id=request.form['hero2_id']).first()
        if hero_1.image:
            hero_1.image = base64.b64encode(hero_1.image).decode('utf-8')
        if hero_2.image:
            try:
                hero_2.image = base64.b64encode(hero_2.image).decode('utf-8')
            except:
                hero_2.image = None
        return render_template('battle.html', hero_1=hero_1, hero_2=hero_2)


@app15.route('/get_new_ helphelphelp    ', methods=['GET', 'POST'])
def get_elo():
    if request.method == 'POST':
        elo_1 = request.form['elo-1']
        elo_2 = request.form['elo-2']
        name_1 = request.form['name-1']
        name_2 = request.form['name-2']
        winner = request.form['winner']
        hero1 = User.query.filter_by(alias=name_1).first()
        hero2 = User.query.filter_by(alias=name_2).first()
        win = User.query.filter_by(alias=winner).first()
        win.WINS += 1
        hero1.eol = float(elo_1)
        hero2.eol = float(elo_2)
        if hero1.eol > 1350:
            hero1.rank = 'RANK-S'
        elif hero1.eol > 1300:
            hero1.rank = 'RANK-A'
        elif hero1.eol > 1250:
            hero1.rank = 'RANK-B'
        elif hero1.eol < 1200:
            hero1.rank = 'RANK-D'
        elif hero1.eol < 1150:
            hero1.rank = 'RANK-E'
        elif hero1.eol < 1100:
            hero1.rank = 'RANK-F'

        if hero2.eol > 1350:
            hero2.rank = 'RANK-S'
        elif hero2.eol > 1300:
            hero2.rank = 'RANK-A'
        elif hero2.eol > 1250:
            hero2.rank = 'RANK-B'
        elif hero2.eol < 1200:
            hero2.rank = 'RANK-D'
        elif hero2.eol < 1150:
            hero2.rank = 'RANK-E'
        elif hero2.eol < 1100:
            hero2.rank = 'RANK-F'
        db.session.commit()
        return redirect(url_for('leaderboard'))


# @app15.route('/get_new_elo', methods=['GET', 'POST'])
# def winner_page

@app15.route('/leaderboard_fan')
def leaderboar_fan():
    heroes = get_hereos()
    for heroe in heroes:
        if heroe.image:
            heroe.image = base64.b64encode(heroe.image).decode('utf-8')
    return render_template('fan_leaderboard.html', heroes=heroes)

@app15.route('/vote')
def vote():
    return render_template('vote.html')

@app15.route('/report')
def report():
    return render_template('report.html')

@app15.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app15.route('/achievements')
def achievements():
    return render_template('achievement.html')

@app15.route('/calculate_elo', methods=['GET', 'POST'])
def calculate_elo_change(player_a_rating, player_b_rating, score, k=32):
    expected_score_a = 1 / (1 + 10 ** ((player_b_rating - player_a_rating) / 400))
    expected_score_b = 1 - expected_score_a

    new_rating_a = player_a_rating + k * (score - expected_score_a)
    new_rating_b = player_b_rating + k * ((1 - score) - expected_score_b)

    elo_change_a = round(new_rating_a - player_a_rating)
    elo_change_b = round(new_rating_b - player_b_rating)

    return elo_change_a, elo_change_b


#
# @app15.route('accept_challange')
# def accept():
#     return render_template('accept_screen')

if __name__ == '__main__':
    app15.run(port=5100, debug=True)
