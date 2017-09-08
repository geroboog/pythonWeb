import json
from controller import controllers
from flask import request
from service import ClassifyImageService
from util.ClockUtil import ClockUtil
from util.RedisUtil import *



@controllers.route('/image/uploadPage')
def uploadPage():
    return 'uploadPage'


@controllers.route('/image/classifyImage', methods=['POST'])
def identifyImage():
        a = request.get_data()
        jsonData = json.loads(a.decode("utf-8"))
        filename = jsonData['filename']
        classifyImageObj = ClassifyImageService.ClassifyImageService()
        result = classifyImageObj.classifyImage(filename)
        return result

