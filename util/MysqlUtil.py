# -*- coding: UTF-8 -*-
# 安装 MYSQL DB for python
from util import MysqlPool
from util.ClockUtil import ClockUtil


# 连接数据库
class MysqlUtil(object):
    connect = type(None)
    cursor = type(None)
    connectionPool = []

    def __init__(self):
        self.connect = MysqlPool.MysqlPool.pool.connection()  # 以后每次需要数据库连接就是用connection（）函数获取连接就好了
        self.cursor = self.connect.cursor()

    def getSqlData(self, sql):
        try:
            cu = ClockUtil()
            cu.getStartTime()
            self.cursor.execute(sql)
            rows = self.cursor.fetchall()
            cu.printTime()
            return rows
        except Exception as err:
            print(err)
            return False
        finally:
            self.closeConnection()

    def insertSqlData(self, sql):
        try:
            self.cursor.execute(sql)
            return True
        except Exception as err:
            print(err)
            return False
        finally:
            self.closeConnection()

    def closeConnection(self):
        self.cursor.close()
        self.connect.close()
