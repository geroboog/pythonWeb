import json
from controller import controllers
from flask import request
from service import HistoryService
from util.ClockUtil import ClockUtil
from util.RedisUtil import *


@controllers.route('/history')
def history():
    return 'The history page'


@controllers.route('/history/getHistoryList', methods=['POST'])
def getHistoryList():
        a = request.get_data()
        jsonData = json.loads(a.decode("utf-8"))
        page = jsonData['page']
        size = jsonData['size']
        historyObj = HistoryService.HistoryService()
        result = historyObj.getHistoryList(page, size)
        return result


@controllers.route('/history/saveHistory', methods=['POST'])
def saveHistory():
    cu = ClockUtil()
    cu.getStartTime()
    a = request.get_data()
    jsonData = json.loads(a.decode("utf-8"))
    userId = jsonData['userId']
    historyObj = HistoryService.HistoryService()
    result = historyObj.saveHistory(userId)
    cu.printTime()
    return result
