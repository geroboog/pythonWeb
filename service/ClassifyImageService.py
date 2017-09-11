import json
from service.classify_image import *
from util.ResponseUtil import ResponseUtil


class ClassifyImageService(object):
    def __init__(self): pass

    def classifyImage(self, filename):
        result = startClassify(filename)

        return json.dumps(ResponseUtil.getResponse(0, result))
