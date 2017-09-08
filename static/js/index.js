/**
 * Created by Guanhua on 2017/8/9.
 */
var timer;
function showfh(){
    fhi = 1;
    //关闭提示晃动屏幕，注释掉这句话即可
    timer = setInterval(xzfh2, 10);
};
var current = 0;
function xzfh(){
    current = (current)%360;
    document.body.style.transform = 'rotate('+current+'deg)';
    current ++;
    if(current>360){current = 0;}
};
var fhi = 1;
var current2 = 1;
function xzfh2(){
    if(fhi>50){
        document.body.style.transform = 'rotate(0deg)';
        clearInterval(timer);
        return;
    }
    current = (current2)%360;
    document.body.style.transform = 'rotate('+current+'deg)';
    current ++;
    if(current2 == 1){current2 = -1;}else{current2 = 1;}
    fhi++;
};


//服务器校验
function severCheck(){
    if(check()){

        var username = $("#loginname").val();
        var password = $("#password").val();
        var code = "username="+username+"&&password="+password;
        $.ajax({
            type: "POST",
            url: baseUrl+'/api/user/login.json?'+code,
            data: {},
            dataType:'json',
            cache: false,
            success: function(data){
                if(data.code==200){
                    sessionStorage.setItem("token",data.data);
                    $.cookie("cookieToken",data.data);
                    $.cookie("username",username);
                    $.cookie("password",password);
                    window.location.href='/view/main';
                }else if(data.code==400){
                    $("#password").tips({
                        side : 1,
                        msg : "密码有误",
                        bg : '#FF5080',
                        time : 15
                    });
                    showfh();
                    $("#password").focus();
                }else{
                    $("#loginname").tips({
                        side : 1,
                        msg : "缺少参数",
                        bg : '#FF5080',
                        time : 15
                    });
                    showfh();
                    $("#loginname").focus();
                }
            }
        });
    }
}

$(document).ready(function() {
    changeCode();
    $("#codeImg").bind("click", changeCode);
});

$(document).keyup(function(event) {
    if (event.keyCode == 13) {
        $("#to-recover").trigger("click");
    }
});

function genTimestamp() {
    var time = new Date();
    return time.getTime();
}

function changeCode() {
    $("#codeImg").attr("src", "code.do?t=" + genTimestamp());
}

//客户端校验
function check() {

    if ($("#loginname").val() == "") {

        $("#loginname").tips({
            side : 2,
            msg : '用户名不得为空',
            bg : '#AE81FF',
            time : 3
        });
        showfh();
        $("#loginname").focus();
        return false;
    } else {
        $("#loginname").val(jQuery.trim($('#loginname').val()));
    }

    if ($("#password").val() == "") {

        $("#password").tips({
            side : 2,
            msg : '密码不得为空',
            bg : '#AE81FF',
            time : 3
        });
        showfh();
        $("#password").focus();
        return false;
    }
    if ($("#code").val() == "") {

        $("#code").tips({
            side : 1,
            msg : '验证码不得为空',
            bg : '#AE81FF',
            time : 3
        });
        showfh();
        $("#code").focus();
        return false;
    }

    $("#loginbox").tips({
        side : 1,
        msg : '正在登录 , 请稍后 ...',
        bg : '#68B500',
        time : 10
    });

    return true;
}

function savePaw() {
    if (!$("#saveid").attr("checked")) {
        $.cookie('loginname', '', {
            expires : -1
        });
        $.cookie('password', '', {
            expires : -1
        });
        $("#loginname").val('');
        $("#password").val('');
    }
}

function saveCookie() {
    if ($("#saveid").attr("checked")) {
        $.cookie('loginname', $("#loginname").val(), {
            expires : 7
        });
        $.cookie('password', $("#password").val(), {
            expires : 7
        });
    }
}
function quxiao() {
    $("#loginname").val('');
    $("#password").val('');
}

jQuery(function() {
    var loginname = $.cookie('loginname');
    var password = $.cookie('password');
    if (typeof(loginname) != "undefined" && typeof(password) != "undefined") {
        $("#loginname").val(loginname);
        $("#password").val(password);
        $("#saveid").attr("checked", true);
        $("#code").focus();
    }
});

//TOCMAT重启之后 点击左侧列表跳转登录首页
if (window != top) {
    top.location.href = location.href;
}