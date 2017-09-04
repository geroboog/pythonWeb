import redis
import time
from util.Singleton import Singleton


class RedisUtil(Singleton):
    redisClient = redis.StrictRedis(host='localhost', port=6379, db=0, password='')

    def getKey(self, keyStr):
        valueObj = self.redisClient.keys(keyStr)
        if not valueObj:
            return None
        else:
            return self.redisClient.get(keyStr)

    def hmget(self, keyStr, nameStr):
        valueObj = self.redisClient.keys(keyStr)
        if not valueObj:
            return None
        else:
            return self.redisClient.hmget(keyStr, nameStr)


r = RedisUtil()
result = r.hmget("22", {"id", "name"})
print(result)
