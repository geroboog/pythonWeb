import os
from flask import Flask, request, redirect, url_for,send_from_directory
from werkzeug.utils import *
UPLOAD_FOLDER=r'E:\tmp'
ALLOWED_EXTENSIONS=set(['txt','pdf','png','jpg','jpeg','gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1] in ALLOWED_EXTENSIONS

@main.route('/upload_file',methods = ['GET','POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER,filename))
            return redirect(url_for('.uploaded_file',filename=filename))       #跳转到预览页面
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

@main.route('/uploaded_file/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER,filename)