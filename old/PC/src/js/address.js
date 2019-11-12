const arr = [
    {
        name: "方钦昇1",
        tag: "家里",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "18819470675",
        isSelect: true,
        isDefault: true,
    },
    {
        name: "方帅2",
        tag: "公司",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "4567861231",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方钦昇3",
        tag: "家里",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "18819470675",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方帅4",
        tag: "公司",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "4567861231",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方钦昇5",
        tag: "家里",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "18819470675",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方帅6",
        tag: "公司",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "4567861231",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方钦昇7",
        tag: "家里",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "18819470675",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方钦昇8",
        tag: "家里",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "18819470675",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方帅9",
        tag: "公司",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "4567861231",
        isSelect: false,
        isDefault: false,
    },
    {
        name: "方钦昇0",
        tag: "家里",
        address: " 广东 广州市 海珠区",
        detail: "昌岗中路166-3号复印国际大厦1218室",
        mobile: "18819470675",
        isSelect: false,
        isDefault: false,
    }
];

function addNewAddress() {
    const content = '<form class="dialog-form" id="address-form" role="form"><div class="item"><span class="label is-required">收货人:</span><div class="value"><input type="text" name="loginName" title=""/></div><span class="error-msg">请输入收货人信息</span></div><div class="item"><span class="label is-required">所在地区:</span><div class="value"><input type="text" name="area" title=""/></div><span class="error-msg">未选择所在地区</span></div><div class="item"><span class="label is-required">详细地址:</span><div class="value"><input type="text" name="address" title=""/></div><span class="error-msg">请填写详细地址</span></div><div class="item"><span class="label is-required">手机号码:</span><div class="value"><input type="text" name="tel" title=""/></div><span class="error-msg">请输入正确的手机号码</span></div><div class="item"><span class="label">座机:</span><div class="value"><input type="text" name="fox" title=""/></div></div><div class="item"><span class="label">地址别名:</span><div class="value"><input type="text" name="barge" placeholder="建议选用常用名称" title=""/></div><div class="barge"><ul><li><a href="javascript: void(0);">家</a></li><li><a href="javascript: void(0);">公司</a></li><li><a href="javascript: void(0);">其他</a></li></ul></div></div><div class="item"><span class="label"></span><div class="value"><button class="button button--danger button--small">保存</button><button class="button button--small">取消</button></div></div></form>';

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

    const content = '<form class="dialog-form" id="address-form" role="form"> <div class="item"> <span class="label is-required">收货人:</span> <div class="value"><input type="text" name="loginName" title="" value="'+ product.name +'"/></div> <span class="error-msg">请输入收货人信息</span> </div> <div class="item"> <span class="label is-required">所在地区:</span> <div class="value"><input type="text" name="area" title="" value="'+ product.address +'"/></div> <span class="error-msg">未选择所在地区</span> </div> <div class="item"> <span class="label is-required">详细地址:</span> <div class="value"><input type="text" name="address" title="" value="'+ product.detail +'"/></div> <span class="error-msg">请填写详细地址</span> </div> <div class="item"> <span class="label is-required">手机号码:</span> <div class="value"><input type="text" name="tel" title="" value="'+ product.mobile +'" /></div> <span class="error-msg">请输入正确的手机号码</span> </div> <div class="item"> <span class="label">座机:</span> <div class="value"><input type="text" name="fox" title=""/></div> </div> <div class="item"> <span class="label">地址别名:</span> <div class="value"><input type="text" name="barge" placeholder="建议选用常用名称" title="" value="value="'+ product.name +'""/></div> <div class="barge"> <ul> <li><a href="javascript: void(0);">家</a></li> <li><a href="javascript: void(0);">公司</a></li> <li><a href="javascript: void(0);">其他</a></li> </ul> </div> </div> <div class="item"> <span class="label"></span> <div class="value"><button class="button button--danger button--small">保存</button><button class="button button--small">取消</button></div> </div> </form>';

    $.dialog({
        id: "editAddress",
        title: "修改地址",
        content: content
    });
}