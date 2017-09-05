import redis
import time
import pickle

from util.Singleton import Singleton


class RedisUtil(Singleton):
    redisClient = redis.StrictRedis(host='localhost', port=6379, db=0, password='')

    def getKey(self, keyStr):
        valueObj = self.redisClient.keys(keyStr)
        if not valueObj:
            return None
        else:
            return pickle.loads(self.redisClient.get(keyStr))

    def hmget(self, keyStr, nameStr):
        valueObj = self.redisClient.keys(keyStr)
        if not valueObj:
            return None
        else:
            return self.redisClient.hmget(keyStr, nameStr)

    def setKey(self, keyStr, value):
        self.redisClient.set(keyStr, pickle.dumps(value), 180)


def CheckRedis(sql):
    sql = "sql:"+sql
    return RedisUtil().getKey(sql)


def SaveRedis(sql, value):
    sql = "sql:"+sql
    RedisUtil().setKey(sql, value)

# r = RedisUtil()
# result = r.hmget("22", {"id", "name"})
# print(result)
