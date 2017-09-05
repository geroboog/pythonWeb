# -*- coding: UTF-8 -*-
# 安装 MYSQL DB for python
from util.MysqlPool import MysqlPool
from util.ClockUtil import ClockUtil
from util.RedisUtil import *


# 连接数据库
class MysqlUtil(object):
    connect = type(None)
    cursor = type(None)
    connectionPool = []

    def __init__(self):
        self.connect = MysqlPool.pool.connection()  # 以后每次需要数据库连接就是用connection（）函数获取连接就好了
        self.cursor = self.connect.cursor()

    def getSqlData(self, sql):
        if CheckRedis(sql) is None:
                try:
                    cu = ClockUtil()
                    cu.getStartTime()
                    self.cursor.execute(sql)
                    rows = self.cursor.fetchall()
                    SaveRedis(sql, rows)
                    cu.printTime()
                    return rows
                except Exception as err:
                    print(err)
                    return False
                finally:
                    self.closeConnection()
        else:
            return CheckRedis(sql)

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
