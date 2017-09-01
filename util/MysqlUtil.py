# -*- coding: UTF-8 -*-
# 安装 MYSQL DB for python
from util import MysqlPool


# 连接数据库
class MysqlUtil(object):
    connect = type(None)
    cursor = type(None)
    connectionPool = []

    def __init__(self):
        self.connect = MysqlPool.pool.connection()  # 以后每次需要数据库连接就是用connection（）函数获取连接就好了
        self.cursor = self.connect.cursor()

    def getSqlData(self, sql):
        self.cursor.execute(sql)
        rows = self.cursor.fetchall()
        self.closeConnection()
        return rows

    def insertSqlData(self, sql):
        self.cursor.execute(sql)
        return False

    def closeConnection(self):
        self.cursor.close()
        self.connect.close()
