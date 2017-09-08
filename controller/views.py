from flask import render_template
from controller import controllers


@controllers.route('/')  # 指定路由为/，因为run.py中指定了前缀，浏览器访问时，路径为http://IP/asset/
def index():
    return render_template('index.html')  # 返回index.html模板，路径默认在templates下


@controllers.route('/test')
def test():
    return render_template('test.html')
