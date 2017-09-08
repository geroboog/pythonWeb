var ws = null;
var url = "localhost:8000";
textCode="语音搜索平台"
successCode="200";
/**
 * 左边历史记录
 */
$(function() {
    $(".history-list").DataLazyLoad({
        load : function(pageIndex, unLocked){

            var count = $("#count").val();

            var max = Math.floor((count - 1)/10 + 1)

            var control = $("#control").val();

            if (pageIndex<=max && control!=1){

                param = {
                    "page":pageIndex,
                    "size":10
                };
                getHistory(param);

            }

            pageIndex = pageIndex > max ? 1 : pageIndex + 1;

            if (pageIndex == 1){
                $("#control").attr("value","1");
            }


            unLocked(pageIndex);

        }
    });
});
getHistory();
redrawQrCode();
connect();

function keyPress(){
    if (event.keyCode==13)  //回车键的键值为13
        getTextDataList();
}
function checkText(obj)
{
    var text=obj.value;
    if(text==textCode)
    {
        obj.value="";
    }
}