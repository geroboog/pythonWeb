from dao import BaseDao
from util import MysqlUtil
from util import MapUtil


class HistoryDao(BaseDao.BaseDao):
    # 定义构造方法
    def __init__(self):
        self.mysqlUtil = MysqlUtil.MysqlUtil()
        self.nameList = ['id', 'user_id', 'text', 'sql_item', 'screen_shot']
        self.insertNameList = ['user_id', 'text', 'sql_item', 'gmt_create', 'gmt_modified']
        self.tableName = " history "

    def selectHistoryById(self, historyId):
        results = self.mysqlUtil.getSqlData("select * from " + self.tableName + "  where id = " + historyId)
        return MapUtil.MapUtil.getMap(self.nameList, results)

    def selectHistoryList(self, pageIndex, pageSize):
        sql = "select * from " + self.tableName + " limit " + pageIndex + " , " + pageSize
        results = self.mysqlUtil.getSqlData(sql)
        return MapUtil.MapUtil.getMap(self.nameList, results)

    def insertHistory(self, dataObj):
        sql = "insert into " + self.tableName + " ( "
        for nameObj in self.insertNameList:
            sql += nameObj + " , "
        sql = sql[:-2]
        sql += " ) "

        sql += " values ( "
        for nameObj in self.insertNameList:
            sql += " '"+str(dataObj[nameObj]) + "' , "
        sql = sql[:-2]
        sql += " ) "
        results = self.mysqlUtil.getSqlData(sql)
        return MapUtil.MapUtil.getMap(self.nameList, results)
