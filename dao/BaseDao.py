class BaseDao:
    mysqlUtil = type(None)
    nameList = type(None)
    tableName = ""

    def __init__(self, n): pass

    def countAll(self):
        count = self.mysqlUtil.getSqlData("select count(1) from " + self.tableName + " ")
        return count[0][0]
