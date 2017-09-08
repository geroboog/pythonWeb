/**
 * Created by Administrator on 2017/8/28.
 */
function setMedia()
{

}

setMedia();
{
    var screenWidth= window.screen.width;
    var screenHeight= window.screen.height;
    var fontSize =0;
    if(screenWidth>1020) {
        fontSize = (screenWidth / 1920) * 36;
    }else
    {
        fontSize = (screenHeight* window.devicePixelRatio / 1920) * 36;
    }
    fontSize=fontSize+"px";
    $('html').css("font-size",fontSize);
}