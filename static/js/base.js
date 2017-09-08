$('.nav li').click(function(event) {
    $(this).addClass('current').siblings().removeClass('current');
});