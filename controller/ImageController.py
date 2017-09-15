import json
from controller import controllers
from flask import request, url_for, send_from_directory, render_template
from service import ClassifyImageService
from util.ClockUtil import ClockUtil
from util.RedisUtil import *

from werkzeug.utils import *

UPLOAD_FOLDER = r'E:\tmp\imagenet'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@controllers.route('/image/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        requesttt = request
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = str(int(time.time()))+secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            classifyImageObj = ClassifyImageService.ClassifyImageService()
            result = classifyImageObj.classifyImage(filename)
            return result
        return '<p> 你上传了不允许的文件类型 </p>'
    return '''''
    <!DOCTYPE html>
    <title>Change new icon</title>
    <h1>Upload new </h1>
    <form action = "" method = "post" enctype=multipart/form-data>
        <input type = "file" name = file>
        <input type = "submit" value = Upload>
    </form>
    '''


@controllers.route('/image/uploaded_file/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@controllers.route('/image/uploadPage')
def uploadPage():
    return render_template('user/uploadFile.html')


@controllers.route('/image/classifyImage', methods=['POST'])
def identifyImage():
    a = request.get_data()
    jsonData = json.loads(a.decode("utf-8"))
    filename = jsonData['filename']
    classifyImageObj = ClassifyImageService.ClassifyImageService()
    result = classifyImageObj.classifyImage(filename)
    return result
