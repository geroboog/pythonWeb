isFirst=true;
function uploadHistoryImg(historyId)
{
    apiUrl =  '/api/upload_file/uploadBase64Img';
    var content=main_chart.getDataURL('PNG');
    param={
            "content":content,
            "historyId":historyId
    };
    getData(param,apiUrl,"post",function (datas) {
            $(".history-listbox > ul").empty();
            getHistory(null);
    }
    );
}

function getTextDataList()
{
    apiUrl =  '/api/history/getTextDataList';
    var text=$('#search').val();
    if(text==''||text==textCode)
    {
        alert("请输入相关文本信息");
        return false;
    }
    param={
        "text":text
    };
    getData(param,apiUrl,"post",function (datas) {

        }
    );
}

function getHistory(param)
{
    if(typeof(param)=='undefined'||param==null)
    {
        param = {
            "page":1,
            "size":3
        };
    }
    apiUrl =  '/api/history/getUserHistoryList.json';
    getData(param,apiUrl,"post",function (datas) {
             $("#count").attr("value",datas.data.count);
            var result = datas.data;
            var class_=""
            if(datas.code==successCode) {
                    $.each(result.data, function (e, v) {
                    var screenShot = v.screenShot;
                    var historyId=v.historyId;
                    var title=v.title;
                    var mage = '<img src="' + screenShot + '" class="history_img"/>';
                    var html = '<li>'
                        + '<a id="' + historyId + '" class="' + class_ + '" href="javascript:;" onclick="getHistoryByHistoryId('+historyId+')">'
                        +'<span>' + title+ '</span>'
                        +mage
                        + '</a>'
                        + '</li>';

                    $(".history-listbox > ul").append(html);

                    if(isFirst==true)
                    {
                        getHistoryByHistoryId(historyId);
                        isFirst=false;
                    }

                    });

            }
        }
    );
}

function getHistoryByHistoryId(historyId)
{
    apiUrl =  '/api/history/getHistoryByHistoryId';
    param={
        "historyId":historyId
    };
    getData(param,apiUrl,"post",function (datas) {
        var result = datas.data;
        var class_=""
        if(datas.code==successCode) {
                $("#history_img_box").empty();
                $("#history_img_box").css("display","block");
                $("#main_chart_box").css("display","none");
                var screenShot = result.screenShot;
                var historyId=result.historyId;
                var title=result.title;
                var mage = '<p><img src="' + screenShot + '"/></p>';
                var html = '<p><span>' + title+ '</span></p>'
                    +mage;

                $("#history_img_box").append(html);
        }

        }
    );
}