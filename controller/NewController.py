import json

from controller import controllers
from service import NewService


@controllers.route('/news')
def news():
    return 'The project page'


@controllers.route('/news/getNewsById/<newsId>', methods=['GET', 'POST'])
def getNewsById(newsId):
    newsObj = NewService.NewService(newsId)
    result = newsObj.getNewsById()
    return result
