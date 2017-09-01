class PageUtil(object):
    def __init__(self): pass

    def getPageIndex(self, page, size):
        return str((page-1)*size)

    def getPageSize(self, page, size):
        return str(page*size)
