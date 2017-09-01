import time


class ClockUtil(object):
    startTime = type(None)
    endTime = type(None)
    def __init__(self):pass

    def getStartTime(self):
        self.startTime = int(round(time.time() * 1000))
    def printTime(self):
        self.endTime=int(round(time.time() * 1000))
        second = (self.endTime - self.startTime)
        print(second)
