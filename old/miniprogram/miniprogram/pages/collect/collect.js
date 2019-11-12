import WxValidate from "../../utils/WxValidate.js";
import CountDown from "../../utils/CountDown.js";

// pages/collect/collect.js
let app = getApp();

const db = wx.cloud.database();
const userInfo = db.collection("ebook_form");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: {
      name: ["请选择所在地区"],
      code: ["440000", "440100", "440105"]
    },
    product: [
      { }
    ],
    disabled: false,
    email: "",
    name: "",
    regionPlaceholoder: "请选择您的地区",
    mobile: null,
    errorModal: null,
    errorText: "",
    validCode: "",
    companyName: "",
    sec: 60,
    status: false
  },

  /**
   * 获取手机号码
   */
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
    console.log(this.data.mobile)
  },

  /**
   * 发送sms
   */
  sendSMS: function () {
    var _this = this;
    var time = _this.data.sec;
    CountDown.getTime(_this, time)
    console.log(this.data.sec)
    // 调用云函数sendSms
    wx.cloud.callFunction({
      name: 'sendSms',
      data: {
        phone: this.data.mobile
      }
    }).then(res => {
        console.log(res)
        wx.showToast({
          title: res.errMsg
        })
    }).catch(res => {
      wx.showToast({
        title: res.errMsg,
        icon: "cancel"
      })
    })
  },

  // 初始化验证
  initValidate: function () {
    const rules = {
      name: {
        required: true,
        rangelength: [2, 4]
      },
      region: {
        required: true
      },
      mobile: {
        required: true,
        tel: true
      },
      validCode: {
        required: true,
        digits: true
      }
    }
    const message = {
      name: {
        required: "请输入姓名",
        rangelength: "请输入2-4个汉字"
      },
      region: {
        required: "请选择地区"
      },
      mobile: {
        required: "请输入11位手机号码",
        tel: "请输入正确的手机号码"
      },
      validCode: {
        required: "请输入验证码",
        digits: "验证码错误"
      }
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, message);
  },

  // 错误提示
  showModal(params) {
    this.setData({
      errorModal: params,
      disabled: true
    })
    var time = 3;
    const _this = this;
    var interval = setInterval(function() {
      time--;
      console.log(time)
      if(time == 0) {
        clearInterval(interval)
        time = 3;
        _this.setData({
          errorModal: null,
          disabled: false
        })
      }
    }, 1000);
  },


  bindAreaChange: function(e) {
    console.log(e);
    this.setData({
      "region.name": e.detail.value,
      "region.code": e.detail.code
    })
    console.log(this.data.region)
  },

  submitInfo: function(params) {
    const db = wx.cloud.database();
    console.log(params);
    db.collection('collect').add({
      data: params,
      success: function (res) {
        console.log(res);
        wx.setStorage({
          key: 'recordFlag',
          data: 'isLogin',
        })
        wx.navigateTo({
          url: '../carousel/carousel',
        })
      },
      fail: console.error
    });
  },

  submitForm: function (e) {
    const params = e.detail.value;
    console.log(params)
    if (!this.WxValidate.checkForm(params)){
      const res = this.WxValidate.errorList[0];
      this.showModal(res.msg)
    } else {
      this.submitInfo(params)
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
  }
})