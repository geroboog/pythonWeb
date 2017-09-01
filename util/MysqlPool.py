# coding=utf-8

import pymysql
from DBUtils.PooledDB import PooledDB

pool = PooledDB(pymysql, 5, host='localhost', user='root', passwd='123456', db='yuyin', port=3306,
                charset='utf8')  # 5为连接池里的最少连接数
