from dao import NewDao
from util import ClockUtil
from util import ResponseUtil
import json
import time
import datetime


class NewService(object):
    newsId = 0
    newsDao = type(None)

    # 定义构造方法
    def __init__(self, n):
        self.newsId = n
        self.newsDao = NewDao.NewDao(n)

    # 新闻Id获取新闻
    def getNewsById(self):
        clock = ClockUtil.ClockUtil()
        clock.getStartTime()
        result = {}
        rows = self.newsDao.selectNewsById()
        result['rows'] = rows
        response = ResponseUtil.ResponseUtil.getResponse(0, result)
        clock.printTime()

        return json.dumps(response)
