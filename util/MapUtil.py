# coding=utf-8
dataCharset = 'utf-8'


class MapUtil(object):
    def __init__(self):
        pass

    @staticmethod
    def getMap(nameList, dataList):
        resultList = []
        for row in dataList:
            result = {}
            index = 0
            for name in nameList:
                result[name] = row[index]
                index += 1
            resultList.append(result)
        return resultList
