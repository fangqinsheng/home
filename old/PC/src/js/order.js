(function () {
    var arr = [
        {
            name: "方钦昇",
            tag: "家里",
            address: " 广东 广州市 海珠区",
            detail: "昌岗中路166-3号复印国际大厦1218室",
            mobile: "18819470675",
            isSelect: true,
            isDefault: true,
        },
        {
            name: "方帅",
            tag: "公司",
            address: " 广东 广州市 海珠区",
            detail: "昌岗中路166-3号复印国际大厦1218室",
            mobile: "4567861231",
            isSelect: false,
            isDefault: false,
        },
        {
            name: "方钦昇",
            tag: "家里",
            address: " 广东 广州市 海珠区",
            detail: "昌岗中路166-3号复印国际大厦1218室",
            mobile: "18819470675",
            isSelect: false,
            isDefault: false,
        },
        {
            name: "方帅",
            tag: "公司",
            address: " 广东 广州市 海珠区",
            detail: "昌岗中路166-3号复印国际大厦1218室",
            mobile: "4567861231",
            isSelect: false,
            isDefault: false,
        },
        {
            name: "方钦昇",
            tag: "家里",
            address: " 广东 广州市 海珠区",
            detail: "昌岗中路166-3号复印国际大厦1218室",
            mobile: "18819470675",
            isSelect: false,
            isDefault: false,
        },
        {
            name: "方帅",
            tag: "公司",
            address: " 广东 广州市 海珠区",
            detail: "昌岗中路166-3号复印国际大厦1218室",
            mobile: "4567861231",
            isSelect: false,
            isDefault: false,
        },
        {
            name: "方钦昇",
            tag: "家里",
            address: " 广东 广州市 海珠区",
            detail: "昌岗中路166-3号复印国际大厦1218室",
            mobile: "18819470675",
            isSelect: false,
            isDefault: false,
        }
    ];

    if(arr) {
        var temp = "";
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].isSelect) {
                temp += '<li class="item is-selected">';
            } else {
                temp += '<li class="item">';
            }
            if(arr[i].isDefault) {
                temp += '<div class="tag"><span>'+ arr[i].tag +'</span><b></b></div><div class="details"><span class="name">'+ arr[i].name +'</span><span class="info">'+ arr[i].address + '' + arr[i].detail +'</span><span class="tel">'+ arr[i].mobile +'</span><span class="default">默认地址</span></div><div class="opt"><a href="javascript:void(0);" onclick="editAddress()" class="edit-address btn--txt">编辑</a></div></li>';
            } else {
                temp += '<div class="tag"><span>'+ arr[i].tag +'</span><b></b></div><div class="details"><span class="name">'+ arr[i].name +'</span><span class="info">'+ arr[i].address + '' + arr[i].detail +'</span><span class="tel">'+ arr[i].mobile +'</span></div><div class="opt"><a href="javascript:void(0);"class="set-default-address btn--txt" onclick="setDefaultAddress(this)">设为默认地址</a><a href="javascript:void(0);" onclick="editAddress()" class="edit-address btn--txt">编辑</a><a href="javascript:void(0);" onclick="deleteAddress(this)" class="delete-address btn--txt">删除</a></div></li>';
            }
        }

        $(".delivery-address .inner ul").html(temp)
    }
})();

function addNewAddress() {
    var content = "";
    content += '<form class="dialog-form" id="address-form" role="form">';
    content += '<div class="item">';
    content += '<span class="label is-required">收货人:</span>';
    content += '<div class="value"><input type="text" name="loginName" title=""/></div>';
    content += '<span class="error-msg">请输入收货人信息</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label is-required">所在地区:</span>';
    content += '<div class="value"><input type="text" name="area" title=""/></div>';
    content += '<span class="error-msg">未选择所在地区</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label is-required">详细地址:</span>';
    content += '<div class="value"><input type="text" name="address" title=""/></div>';
    content += '<span class="error-msg">请填写详细地址</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label is-required">手机号码:</span>';
    content += '<div class="value"><input type="text" name="tel" title=""/></div>';
    content += '<span class="error-msg">请输入正确的手机号码</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label">座机:</span>';
    content += '<div class="value"><input type="text" name="fox" title=""/></div>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label">地址别名:</span>';
    content += '<div class="value"><input type="text" name="barge" placeholder="建议选用常用名称" title=""/></div>';
    content += '<div class="barge">';
    content += '<ul>';
    content += '<li><a href="javascript: void(0);">家</a></li>';
    content += '<li><a href="javascript: void(0);">公司</a></li>';
    content += '<li><a href="javascript: void(0);">其他</a></li>';
    content += '</ul>';
    content += '</div>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label"></span>';
    content += '<div class="value"><button class="button button--danger button--small">保存</button><button class="button button--small">取消</button></div>';
    content += '</div>';
    content += '</form>';


    $.dialog({
        id: "addAddress",
        title: "修改地址",
        content: content
    });
}

function editAddress() {
    const product = {
        name: "方钦昇",
        tag: "家里",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "18819470675",
        isSelect: true,
        isDefault: true,
    };

    var content = "";
    content += '<form class="dialog-form" id="address-form" role="form">';
    content += '<div class="item">';
    content += '<span class="label is-required">收货人:</span>';
    content += '<div class="value"><input type="text" name="loginName" title="" value="'+ product.name +'"/></div>';
    content += '<span class="error-msg">请输入收货人信息</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label is-required">所在地区:</span>';
    content += '<div class="value"><input type="text" name="area" title="" value="'+ product.address +'"/></div>';
    content += '<span class="error-msg">未选择所在地区</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label is-required">详细地址:</span>';
    content += '<div class="value"><input type="text" name="address" title="" value="'+ product.detail +'"/></div>';
    content += '<span class="error-msg">请填写详细地址</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label is-required">手机号码:</span>';
    content += '<div class="value"><input type="text" name="tel" title="" value="'+ product.mobile +'" /></div>';
    content += '<span class="error-msg">请输入正确的手机号码</span>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label">座机:</span>';
    content += '<div class="value"><input type="text" name="fox" title=""/></div>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label">地址别名:</span>';
    content += '<div class="value"><input type="text" name="barge" placeholder="建议选用常用名称" title="" value="value="'+ product.name +'""/></div>';
    content += '<div class="barge">';
    content += '<ul>';
    content += '<li><a href="javascript: void(0);">家</a></li>';
    content += '<li><a href="javascript: void(0);">公司</a></li>';
    content += '<li><a href="javascript: void(0);">其他</a></li>';
    content += '</ul>';
    content += '</div>';
    content += '</div>';
    content += '<div class="item">';
    content += '<span class="label"></span>';
    content += '<div class="value"><button class="button button--danger button--small">保存</button><button class="button button--small">取消</button></div>';
    content += '</div>';
    content += '</form>';


    $.dialog({
        id: "editAddress",
        title: "修改地址",
        content: content
    });
}

function setDefaultAddress(index) {
    const str = '<span class="default">默认地址</span>';
    $(index).parent().find("details").appendChild(str);
    console.log(this)
}

function deleteAddress(index) {
    $(index).parent().parent().remove();
}

function editInvoice() {
    var content = "";
    content = '<div class="invoice" id="invoice"><ul class="invoice-tab cl"><li><a href="#normal">普通发票<b></b></a></li><li><a href="#vat">增值税专用发票<b></b></a></li></ul><div class="invoice-box" id="normal"><div class="invoice-desc"><p>我司依法开具发票，请您按照税法规定使用发票。</p><p>为响应环保，京东自营全面启用电子普通发票，非京东自营发票由第三方商家实际开具。</p></div><form class="invoice-form"><div class="item"><label class="">发票抬头</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="">纳税人识别号</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="">发票内容</label><ul class="vc"><li class="invoice-item">不开发票<b></b></li><li class="invoice-item active">商品明细<b></b></li></ul></div><div class="invoice-btn"><a class="a__danger has-bg">保存</a><a class="a__primary has-bg">返回</a></div></form></div><div class="invoice-box" id="vat"><div class="invoice-desc"><p>我司依法开具发票，请您按照税法规定使用发票。</p><p>为响应环保，京东自营全面启用电子普通发票，非京东自营发票由第三方商家实际开具。</p></div><div class="invoice-option"><div class="item"><span>开票方式</span><div class="fl"><ul><li class="invoice-item active">订单完成后开票<b></b></li></ul></div></div><div class="item"><span>发票内容</span><div><ul><li class="invoice-item active">商品明细<b></b></li></ul></div></div></div><ul class="invoice-step"><li class="item current">1. 选择开票方式</li><li class="cable current"></li><li class="item">2. 填写核对公司信息</li><li class="cable"></li><li class="item">3. 填写收票人信息</li></ul><div class="invoice-content"><div class="step-content step1"><div class="invoice-tips"><span>发票将在订单完成之后的3-5个工作日寄出</span></div></div><div class="step-content step2 hide"><form class="invoice-form"><div class="item"><label class="is-required">单位名称</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="is-required">纳税人识别号</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="is-required">注册地址</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="is-required">注册电话</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="is-required">开户银行</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="is-required">银行账户</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div></form></div><div class="step-content step3 hide"><form class="invoice-form"><div class="item"><label class="is-required">收票人姓名</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="is-required">收票人手机</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div><div class="item"><label class="is-required">收票人省份</label><div id="city_4" class="input" style="width: 300px;"><select class="prov"></select><select class="city"disabled="disabled"></select><select class="dist" disabled="disabled"></select></div></div><div class="item"><label class="is-required">详细地址</label><div class="input" style="width: 300px;"><input type="text" class="input__inner" name=""></div></div></form></div></div><div class="invoice-toolbar"><div class="invoice-btn"><a class="a__danger has-bg" id="confirm-btn">保存</a><a class="a__primary has-bg next-step" id="next-step">下一步</a><a class="a__primary has-bg prev-btn" id="prev-btn">返回</a><a class="a__primary has-bg cancle-btn"id="cancle-btn">取消</a></div></div></div></div>'
    $.dialog({
        id: "editInvoice",
        title: "修改发票",
        content: content
    });
}

// $(".invoice").tabs();

(function() {
    // 鼠标移过显影
    $(".delivery-address .item").each(function() {
        $(this)
            .mouseover(function() {
                $(this).addClass("hover");
            })
            .mouseout(function() {
                $(this).removeClass("hover");
            });
    });
    // 更多地址按钮
    $(".delivery-address .switch-on").click(function() {
        $(".delivery-address .inner").css({
            height: "200px",
            "overflow-y": "scroll"
        });
        $(".delivery-address .switch").removeClass("hide");
        $(this).addClass("hide");
    });
    // 收起地址按钮
    $(".delivery-address .switch-off").click(function() {
        $(".delivery-address .inner").css({
            height: "32px",
            overflow: "hidden"
        });
        $(".delivery-address .switch").removeClass("hide");
        $(this).addClass("hide");
    });
    // 切换地址
    $(".delivery-address .tag").each(function() {
        $(this).click(function() {
            if (
                $(this)
                    .parent()
                    .hasClass("is-selected")
            ) {
                return false;
            } else {
                $(".delivery-address .item").removeClass("is-selected");
                $(this)
                    .parent()
                    .addClass("is-selected");
            }
        });
    });
})();
