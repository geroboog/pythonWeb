from dao import HistoryDao
from util import ClockUtil
from util import ResponseUtil
from util import PageUtil
import json
import time
import datetime


class HistoryService(object):
    historyDao = type(None)

    # 定义构造方法
    def __init__(self):
        self.historyDao = HistoryDao.HistoryDao()

    # 历史Id获取历史
    def getHistoryById(self, historyId):
        result = {}
        rows = self.historyDao.selectHistoryById(historyId)
        result['rows'] = rows
        response = ResponseUtil.ResponseUtil.getResponse(0, result)
        return json.dumps(response)

    def getHistoryList(self, page, size):
        pg = PageUtil.PageUtil()
        result = {}
        pageIndex = pg.getPageIndex(page, size)
        pageSize = pg.getPageSize(page, size)
        rows = self.historyDao.selectHistoryList(pageIndex, pageSize)
        result['rows'] = rows
        response = ResponseUtil.ResponseUtil.getResponse(0, result)
        return json.dumps(rows)

    def saveHistory(self, userId):
        pg = PageUtil.PageUtil()
        historyObj = {}
        result = {}
        historyObj['user_id'] = userId
        historyObj['text'] = "xx"
        historyObj['sql_item'] = "[1,2]"
        historyObj['gmt_create'] = "11111"
        historyObj['gmt_modified'] = "11111"

        self.historyDao.insertHistory(historyObj)
        return json.dumps("")
