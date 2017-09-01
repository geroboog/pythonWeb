from dao import BaseDao
from util import MysqlUtil
from util import MapUtil


class NewDao(BaseDao.BaseDao):
    newsId = 0

    # 定义构造方法
    def __init__(self, n):
        self.newsId = n
        self.mysqlUtil = MysqlUtil.MysqlUtil()
        self.nameList = ['SEV_ID', 'ACC_NBR']
        self.tableName = " guangzhou "

    def selectNewsById(self):
        results = self.mysqlUtil.getSqlData("select * from " + self.tableName + " limit 1000")
        return MapUtil.MapUtil.getMap(self.nameList, results)

