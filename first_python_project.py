import json
from flask import Flask
from flask import request
from service import NewService
from service import HistoryService

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/news')
def news():
    return 'The project page'


@app.route('/news/getNewsById/<newsId>', methods=['GET', 'POST'])
def getNewsById(newsId):
    news = NewService.NewService(newsId)
    result = news.getNewsById()
    return result


@app.route('/history')
def history():
    return 'The history page'


@app.route('/history/getHistoryList', methods=['POST'])
def getHistoryList():
    a = request.get_data()
    jsonData = json.loads(a.decode("utf-8"))
    page = jsonData['page']
    size = jsonData['size']
    historyObj = HistoryService.HistoryService()
    result = historyObj.getHistoryList(page, size)
    return result

@app.route('/history/saveHistory', methods=['POST'])
def getHistoryList():
    a = request.get_data()
    jsonData = json.loads(a.decode("utf-8"))
    userId = jsonData['userId']
    historyObj = HistoryService.HistoryService()
    result = historyObj.saveHistory(userId)
    return result


@app.route('/about')
def about():
    return 'The about page'


if __name__ == '__main__':
    app.debug = True
    app.run()  # app.run(host='0.0.0.0')
