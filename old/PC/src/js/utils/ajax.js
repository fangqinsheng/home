//超时时间
const timeoutMillisecond = 15000;
/**
 * ajax同步Post返回json
 * url 发送请求的地址
 * data 发送到服务器的数据
 * successFn 成功回调函数
 * errorFn 失败回调函数
 */
$.ajaxSyncPostJson=function(url, paramData, successFn) {

    paramData = addRandomData(paramData);

    $.ajax({
        url: url,//请求的URL
        data: paramData,//请求所传参数，json格式
        type: "post",//请求方式post
        async: false,//是否同步：是
        dataType: "json",//返回的数据格式
        // timeout: timeoutMillisecond,//请求超时时间
        success: function(jsonData){
            var sign = callbackSuccess(jsonData);
            if(!sign) {
                successFn(jsonData)
            }
        },
        error: function(XMLHttpRequest,textStatus){
            errorFn(XMLHttpRequest,textStatus);
        }
    });
};



/**
 * ajax异步Post返回json
 * url 发送请求的地址
 * data 发送到服务器的数据
 * successFn 成功回调函数
 * errorFn 失败回调函数
 */
$.ajaxAsyncPostJson=function(url, paramData, successFn) {

    paramData = addRandomData(paramData);

    $.ajax({
        url: url,//请求的URL
        data: paramData,//请求所传参数，json格式
        type: "post",//请求方式post
        async: true,//是否同步：是
        dataType: "json",//返回的数据格式
        timeout: timeoutMillisecond,//请求超时时间
        success: function(jsonData){
            var sign = callbackSuccess(jsonData);
            if(!sign){
                successFn(jsonData)
            }
        },
        error: function(XMLHttpRequest,textStatus){
            errorFn(XMLHttpRequest,textStatus);
        }
    });
};


function addRandomData(paramData){

    if(paramData == null || typeof(paramData) === "undefined"){
        paramData = {};
        paramData.date = new Date().getTime();
    }else{
        paramData.date = new Date().getTime();
    }
    return paramData;
}


function errorFn(XMLHttpRequest,textStatus){

    if( textStatus === "timeout"){
        alert("请求超时！");
    }else{
        alert("服务器错误！状态码："+XMLHttpRequest.status);
    }
    //错误信息
    console.log("XMLHttpRequest.status  "+XMLHttpRequest.status);
    console.log("XMLHttpRequest.readyState："+XMLHttpRequest.readyState);
    console.log("错误信息："+textStatus);
    return false;
}

/**
 * 回调成功方法，
 * @param jsonData
 * @returns {boolean}
 */
function callbackSuccess(jsonData){
    var sign = false;

    if(jsonData != null && jsonData.code != null){
        if(jsonData.code === 301 && jsonData.message != null){
            console.log(jsonData.message);
            window.location.href = jsonData.message;
            return false;
        }else if(jsonData.code === 400 && jsonData.message != null){
            console.log(jsonData.message);
            sign = true;
        }else if(jsonData.code === 500){
            alert("系统错误，请联系管理员！");
            sign = true;
        }

    }else{
        alert("请求错误，请联系管理员！");
        sign = true;
    }
    return sign;
}
