# coding=utf-8

import pymysql
from DBUtils.PooledDB import PooledDB

from util.Singleton import Singleton


class MysqlPool(Singleton):
    pool = PooledDB(pymysql, 5, host='localhost', user='root', passwd='123456', db='yuyin', port=3306,
                    charset='utf8')  # 5为连接池里的最少连接数
    # pool = PooledDB(pymysql, 5, host='192.168.30.171', user='root', passwd='root', db='test', port=3306,
    #                 charset='utf8')  # 5为连接池里的最少连接数
