dataCache=null;
historyIdCache=null;
function connect() {
    var url=document.location.host;
    if ('WebSocket' in window) {
        ws= new WebSocket("ws://"+url+"/socketServer");
        console.log("ws://"+url+"/socketServer");
    }else {
        ws = new SockJS("http://"+url+"/socketServer");
        console.log("http://"+url+"/socketServer");
    }
    //websocket = new SockJS("http://localhost:8080/SpringWebSocketPush/sockjs/websck");
    ws.onopen = function () {
        console.log('open');
        //log('Info: connection opened.');
    };
    ws.onmessage = function (event) {
        if(event.data!='建立socket连接成功') {
            var eventData = eval("(" + event.data + ")");
            if(eventData.data.flag=="False")
            {
                alert(eventData.message);
                return false;
            }
            var historyId = parseInt(eventData.data.historyId);
            getHistoryDataByHistoryIdForFirstTime(historyId);
        }
    };
    ws.onclose = function (event) {
        log('Info: connection closed.');
    };
}

function disconnect() {
    if (ws != null) {
        ws.close();
        ws = null;
    }
}

function echo() {
    if (ws != null) {
        var message = document.getElementById('message').value;
        log('Sent: ' + message);
        ws.send(message);
    } else {
        alert('connection not established, please connect.');
    }
}

/**这个方法是用来自动获取到历史记录的**/
function getHistoryDataByHistoryIdForFirstTime(historyId) {
    var url =  '/api/history/getDataList?historyId='+historyId;
    var params={
    };
    getData(params,url,"post",function (datas) {
            $('.dotstyle > ul').empty();
            dataCache=datas;
            historyIdCache=historyId;
            var result=datas.data.data;
            var title=datas.data.title;
             $("#search").val(title);
             $("#right_box").css("display","block");
             $('#bg').css("display","block");
             $('#main_chart_title').empty();
             $('#main_chart_title').append('<span>'+title+'</span>');
             $("#right_box_content").empty();
             $("#history_img_box").css("display","none");
             var index=0;
             $.each(result, function (e, v) {
                 var dataList=v.dataList;
                 var nameList=v.nameList;
                 index++;
                 drawCharts(index,nameList,dataList,result.length);
             });
            //
            // var appendStr="";
            // appendStr+='<li class="current" id="nav0"><a href="#">'+index+'</a></li>';
            // var page=0;
            // if(index%2==0)
            // {
            //     page=index/2-1;
            // }else
            // {
            //     page=((index+1)/2)-1;
            // }
            // for(var i=0;i<page;i++) {
            //     appendStr += '<li id="nav'+(i+1)+'"><a href="#" >' + index + '</a></li>';
            // }
            // $('.dotstyle > ul').append(appendStr);
            //     initNav();
            // oneHeight=document.getElementById('chart_box_1').offsetHeight;
    });

}
function drawCharts(index,nameList,dataList,size)
{
    var chartBoxId='chart_box_'+index;
    var mainChartId='main_chart_'+index;
     if((size==3&&index>1)||size==4)
    {
        $("#right_box_content").append('<div class="chart_box_min" id="'+chartBoxId+'" onclick="selectChart('+index+');"></div>');
    }else {
         $("#right_box_content").append('<div class="chart_box" id="'+chartBoxId+'" onclick="selectChart('+index+');"></div>');
     }
    $("#"+chartBoxId).append('<div id="'+mainChartId+'" class="main_chart"></div>');
    var chart = echarts.init(document.getElementById(mainChartId));
    chart.title = '图像'+index;

    var chart_option = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series: [
            {
                name: '数值',
                type: 'bar',
                barWidth: '60%',
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            position:'top',
                            formatter : '{c}',
                            textStyle : {
                                fontSize:14
                            }
                        },
                        barBorderRadius:[5, 5, 5,5],
                        color: function(params) {
                            var cl_val = params.value;
                            var cll = ['#3398D8'];
                            if(cl_val >= 0) {
                                return '#3398D8';
                            }else {
                                return '#ff1532';
                            };
                        }
                    }
                },
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    chart_option.xAxis[0].data=nameList;
    chart_option.series[0].data=dataList;
    chart.setOption(chart_option);
}
function selectChart(index)
{
    if(!confirm("是否确认选择为合适图表"))
    {
        return false;
    }
    var result=dataCache.data.data;
    var title=dataCache.data.title;
    $("#main_chart_box").css("display","block");
    $('#right_title > p > span').empty();
    $('#right_title > p > span').append(title);
    $("#main_chart").css("display","block");
    $("#right_title").css("display","block");
    var thisIndex=0;
    $.each(result, function (e, v) {
        thisIndex++;
        if(index==thisIndex) {
            if(main_chart!=null)
            {
                main_chart.dispose();
            }
            main_chart = echarts.init(document.getElementById("main_chart"));
            main_chart.title = title;
            var dataList = v.dataList;
            var nameList = v.nameList;
            var chart_option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '数值',
                        type: 'bar',
                        barWidth: '60%',
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true,
                                    position:'top',
                                    formatter : '{c}',
                                    textStyle : {
                                        fontSize:14
                                    }
                                },
                                barBorderRadius:[5, 5, 5,5],
                                color: function(params) {
                                    var cl_val = params.value;
                                    var cll = ['#3398D8'];
                                    if(cl_val >= 0) {
                                        return '#3398D8';
                                    }else {
                                        return '#ff1532';
                                    };
                                }
                            }
                        },
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            };
            chart_option.xAxis[0].data = nameList;
            chart_option.series[0].data = dataList;
            main_chart.setOption(chart_option);
            uploadHistoryImg(historyIdCache);
        }
    });


    mainChartClose(1);
}
function initNav()
{
    [].slice.call( document.querySelectorAll( '.dotstyle > ul' ) ).forEach( function( nav ) {
        new DotNav( nav, {
            callback : function( idx ) {
                //console.log( idx )
            }
        } );
    } );
}