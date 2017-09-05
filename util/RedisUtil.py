import redis
import time
import pickle

from util.Singleton import Singleton


class RedisUtil(Singleton):
    redisClient = redis.StrictRedis(host='localhost', port=6379, db=0, password='')

    # get Binary Object from redis by key
    def getKey(self, keyStr):
        valueObj = self.redisClient.keys(keyStr)
        if not valueObj:
            return None
        else:
            return pickle.loads(self.redisClient.get(keyStr))

    # get hash set from redis by key and name array which is used for find relative ids from hash set
    def hmget(self, keyStr, nameStr):
        valueObj = self.redisClient.keys(keyStr)
        if not valueObj:
            return None
        else:
            return self.redisClient.hmget(keyStr, nameStr)

    # set Binary Object to redis
    def setKey(self, keyStr, value):
        self.redisClient.set(keyStr, pickle.dumps(value), 180)


# check whether there is a existed sql Object saved in redis
def CheckRedis(sql):
    sql = "sql:" + sql
    return RedisUtil().getKey(sql)


# save a binary sql object to redis
def SaveRedis(sql, value):
    sql = "sql:" + sql
    RedisUtil().setKey(sql, value)

