urls="";
// baseUrl="http://192.168.30.38:8000";
baseUrl="";
function getData(jsonPram,url,postType,fun){
    var url =urls+ url;
    $.ajax({
        dataType : "json",
        type : postType,
        url :url,
        data : jsonPram,
        success : function (data) {
            fun(data);
        },
        error : function (e) {
            console.log("数据异常[%s]",url);
        }
    });
}
