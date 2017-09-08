from flask import Blueprint

controllers = Blueprint('controllers',
                  __name__,
                  # template_folder='/opt/auras/templates/',   #指定模板路径
                  # static_folder='/opt/auras/flask_bootstrap/static/',#指定静态文件路径
                  )

import controller.views
import controller.HistoryController
import controller.NewController
import controller.ImageController

