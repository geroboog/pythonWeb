
var sj = $('.history-listbox');
(function($, sj, undefined) {
    $.fn.DataLazyLoad = function(options) {
        var elements = $(this);
        var settings = {
            offset : 200,
            load : function () {},
            page : 2
        }
        if (options)
        {
            $.extend(settings, options);
        }
        var winHeight = $(sj).height();
        var locked = false;
        var unLock = function (nextPage) {
            if (nextPage > 0)
            {
                settings.page = nextPage;
                locked = false;
            }
        }
        $(sj).scroll(function () {
            var scrollTop = $(sj).scrollTop();
            var offset = $(elements).offset().top + $(elements).height() - (scrollTop + winHeight);
            if(offset < settings.offset && !locked){
                locked = true;
                settings.load(settings.page, unLock);
            }
        });
    }
})(jQuery, sj);