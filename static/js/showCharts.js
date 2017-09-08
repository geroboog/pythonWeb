/**
 * Created by Guanhua on 2017/8/11.
 */


function mainChartClose(type)
{
    if(type==null) {
        if (!confirm("是否不选择一个图表保存为历史数据并离开？")) {
            return false;
        }
    }
    $('#right_box_content').empty();
    $('#bg').css("display","none");
    $('#right_box').css("display","none");
}
main_chart=null;