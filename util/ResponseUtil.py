class ResponseUtil(object):
    def __init__(self): pass

    @staticmethod
    def getResponse(code, data):
        result = {"code": code, "data": data}
        return result
