// let global = getApp().globalData;
// console.log(global.recordFlag)
var getTouchData = require("../../utils/touch.js")

var canOnePointMove = false
var onePoint = {
  x: 0,
  y: 0
}
var twoPoint = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scaleImage: null,
    width: 0,
    height: 0,
    left: 375,
    top: 600,
    scale: 1,
    rotate: 0,
    open: false,                   //侧边栏打开状态          
    guide: false,
    first: false,
    second: false,
    modal: false,
    currentHeight: 0,
    dialog: {
      title: "温馨提示",
      description: "为了更好的向您推荐适合您的产品，请填写您的相关企业信息，感谢您的使用！",
      btn: "前往填写"
    },
    touchDot: "",
    time: 0,
    interval: "",
    stv: {
      zoom: false, //是否缩放状态
      distance: 0, //两指距离
      scale: 1,    //缩放倍数
    },
    gallery: [
      { id: 1, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/1.jpg", show: true },
      { id: 2, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/2.jpg", show: false },
      { id: 3, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/3.jpg", show: false },
      { id: 4, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/4.jpg", show: false },
      { id: 5, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/5.jpg", show: false },
      { id: 6, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/6.jpg", show: false },
      { id: 7, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/7.jpg", show: false },
      { id: 8, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/8.jpg", show: false },
      { id: 9, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/9.jpg", show: false },
      { id: 10, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/10.jpg", show: false },
      { id: 11, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/11.jpg", show: false },
      { id: 12, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/12.jpg", show: false },
      { id: 13, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/13.jpg", show: false },
      { id: 14, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/14.jpg", show: false },
      { id: 15, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/15.jpg", show: false },
      { id: 16, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/16.jpg", show: false },
      { id: 17, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/17.jpg", show: false },
      { id: 18, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/18.jpg", show: false },
      { id: 19, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/19.jpg", show: false },
      { id: 20, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/20.jpg", show: false },
      { id: 21, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/21.jpg", show: false },
      { id: 22, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/22.jpg", show: false },
      { id: 23, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/23.jpg", show: false },
      { id: 24, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/24.jpg", show: false },
      { id: 25, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/25.jpg", show: false },
      { id: 26, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/26.jpg", show: false },
      { id: 27, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/27.jpg", show: false },
      { id: 28, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/28.jpg", show: false },
      { id: 29, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/29.jpg", show: false },
      { id: 30, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/30.jpg", show: false },
      { id: 31, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/31.jpg", show: false },
      { id: 32, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/32.jpg", show: false },
      { id: 33, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/33.jpg", show: false },
      { id: 34, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/34.jpg", show: false },
      { id: 35, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/35.jpg", show: false },
      { id: 36, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/36.jpg", show: false },
      { id: 37, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/37.jpg", show: false },
      { id: 38, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/38.jpg", show: false },
      { id: 39, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/39.jpg", show: false },
      { id: 40, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/40.jpg", show: false },
      { id: 41, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/41.jpg", show: false },
      { id: 42, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/42.jpg", show: false },
      { id: 43, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/43.jpg", show: false },
      { id: 44, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/44.jpg", show: false },
      { id: 45, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/45.jpg", show: false },
      { id: 46, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/46.jpg", show: false },
      { id: 47, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/47.jpg", show: false },
      { id: 48, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/48.jpg", show: false },
      { id: 49, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/49.jpg", show: false },
      { id: 50, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/50.jpg", show: false },
      { id: 51, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/51.jpg", show: false },
      { id: 52, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/52.jpg", show: false },
      { id: 53, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/53.jpg", show: false },
      { id: 54, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/54.jpg", show: false },
      { id: 55, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/55.jpg", show: false },
      { id: 56, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/56.jpg", show: false },
      { id: 57, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/57.jpg", show: false },
      { id: 58, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/58.jpg", show: false },
      { id: 59, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/59.jpg", show: false },
      { id: 60, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/60.jpg", show: false },
      { id: 61, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/61.jpg", show: false },
      { id: 62, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/62.jpg", show: false },
      { id: 63, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/63.jpg", show: false },
      { id: 64, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/64.jpg", show: false },
      { id: 65, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/65.jpg", show: false },
      { id: 66, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/66.jpg", show: false },
      { id: 67, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/67.jpg", show: false },
      { id: 68, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/68.jpg", show: false },
      { id: 69, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/69.jpg", show: false },
      { id: 70, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/70.jpg", show: false },
      { id: 71, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/71.jpg", show: false },
      { id: 72, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/72.jpg", show: false },
      { id: 73, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/73.jpg", show: false },
      { id: 74, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/74.jpg", show: false },
      { id: 75, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/75.jpg", show: false },
      { id: 76, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/76.jpg", show: false },
      { id: 77, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/77.jpg", show: false },
      { id: 78, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/78.jpg", show: false },
      { id: 79, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/79.jpg", show: false },
      { id: 80, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/80.jpg", show: false },
      { id: 81, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/81.jpg", show: false },
      { id: 82, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/82.jpg", show: false },
      { id: 83, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/83.jpg", show: false },
      { id: 84, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/84.jpg", show: false },
      { id: 85, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/85.jpg", show: false },
      { id: 86, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/86.jpg", show: false },
      { id: 87, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/87.jpg", show: false },
      { id: 88, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/88.jpg", show: false },
      { id: 89, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/89.jpg", show: false },
      { id: 90, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/90.jpg", show: false },
      { id: 91, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/91.jpg", show: false },
      { id: 92, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/92.jpg", show: false },
      { id: 93, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/93.jpg", show: false },
      { id: 94, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/94.jpg", show: false },
      { id: 95, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/95.jpg", show: false },
      { id: 96, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/96.jpg", show: false },
      { id: 97, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/97.jpg", show: false },
      { id: 98, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/98.jpg", show: false },
      { id: 99, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/99.jpg", show: false },
      { id: 100, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/100.jpg", show: false },
      { id: 101, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/101.jpg", show: false },
      { id: 102, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/102.jpg", show: false },
      { id: 103, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/103.jpg", show: false },
      { id: 104, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/104.jpg", show: false },
      { id: 105, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/105.jpg", show: false },
      { id: 106, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/106.jpg", show: false },
      { id: 107, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/107.jpg", show: false },
      { id: 108, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/108.jpg", show: false },
      { id: 109, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/109.jpg", show: false },
      { id: 110, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/110.jpg", show: false },
      { id: 111, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/111.jpg", show: false },
      { id: 112, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/112.jpg", show: false },
      { id: 113, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/113.jpg", show: false },
      { id: 114, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/114.jpg", show: false },
      { id: 115, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/115.jpg", show: false },
      { id: 116, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/116.jpg", show: false },
      { id: 117, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/117.jpg", show: false },
      { id: 118, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/118.jpg", show: false },
      { id: 119, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/119.jpg", show: false },
      { id: 120, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/120.jpg", show: false },
      { id: 121, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/121.jpg", show: false },
      { id: 122, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/122.jpg", show: false },
      { id: 123, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/123.jpg", show: false },
      { id: 124, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/124.jpg", show: false },
      { id: 125, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/125.jpg", show: false },
      { id: 126, url: "cloud://e-book-sfame.652d-e-book-sfame-1257383114/carousel/126.jpg", show: false }
    ],
    aside: [
      { id: 3, name: "标示盒", range: "P1-P7" },
      { id: 11, name: "保鲜盒", range: "P8-P13" },
      { id: 17, name: "份数盘", range: "P14-P25" },
      { id: 29, name: "储物桶", range: "P26-P31" },
      { id: 35, name: "储物箱", range: "P32-P37" },
      { id: 41, name: "物流箱", range: "P38-P41" },
      { id: 45, name: "整理箱", range: "P42-P3" },
      { id: 47, name: "原料箱", range: "P44-P46" },
      { id: 50, name: "面团箱", range: "P47-P49" },
      { id: 53, name: "托盘", range: "P50-P57" },
      { id: 61, name: "餐盖", range: "P58-P63" },
      { id: 67, name: "周转箱", range: "P64-P67" },
      { id: 71, name: "筛", range: "P68-P75" },
      { id: 79, name: "杯筐", range: "P76-P81" },
      { id: 85, name: "服务车", range: "P82-P85" },
      { id: 89, name: "砧板", range: "P86-P89" },
      { id: 93, name: "桌面用品", range: "P90-P99" },
      { id: 103, name: "调味罐", range: "P100-P103" },
      { id: 107, name: "台牌", range: "P104-P107" },
      { id: 111, name: "展示架", range: "P108-P115" },
      { id: 119, name: "其他", range: "P116-P119" },
      { id: 123, name: "环保餐盒", range: "P120-P123" }
    ]
  },
  

  /**
 * 关闭侧边栏
 */
  closeAside: function (e) {
    this.setData({
      open: false
    })
  },

  /**
   * 打开侧边栏
   */
  openAside: function () {
    console.log(1)
    this.setData({
      open: true
    })
  },

  /**
  * 图片加载完毕后
  */
  bindload: function (e) {
    console.log(e)
    var that = this
    var width = e.detail.width
    var height = e.detail.height
    if (width > 750) {
      height = 750 * height / width
      width = 750
    }
    if (height > 1200) {
      width = 1200 * width / height
      height = 1200
    }
    that.setData({
      width: width,
      height: height
    })
  },

  /**
  * 缩放开始
  */
  scaleStart: function (e) {
    var that = this
    if (e.touches.length < 2) {
      canOnePointMove = true
      onePoint.x = e.touches[0].pageX * 2
      onePoint.y = e.touches[0].pageY * 2
    } else {
      twoPoint.x1 = e.touches[0].pageX * 2
      twoPoint.y1 = e.touches[0].pageY * 2
      twoPoint.x2 = e.touches[1].pageX * 2
      twoPoint.y2 = e.touches[1].pageY * 2
    }
  },

  /**
  * 缩放过程
  */
  scaleMove: function (e) {
    var that = this
    if (e.touches.length < 2 && canOnePointMove) {
      var onePointDiffX = e.touches[0].pageX * 2 - onePoint.x
      var onePointDiffY = e.touches[0].pageY * 2 - onePoint.y
      that.setData({
        left: that.data.left + onePointDiffX,
        top: that.data.top + onePointDiffY
      })
      onePoint.x = e.touches[0].pageX * 2
      onePoint.y = e.touches[0].pageY * 2
    } else if (e.touches.length > 1) {
      var preTwoPoint = JSON.parse(JSON.stringify(twoPoint))
      twoPoint.x1 = e.touches[0].pageX * 2
      twoPoint.y1 = e.touches[0].pageY * 2
      twoPoint.x2 = e.touches[1].pageX * 2
      twoPoint.y2 = e.touches[1].pageY * 2
      // 计算角度，旋转(优先)
      var perAngle = Math.atan((preTwoPoint.y1 - preTwoPoint.y2) / (preTwoPoint.x1 - preTwoPoint.x2)) * 180 / Math.PI
      var curAngle = Math.atan((twoPoint.y1 - twoPoint.y2) / (twoPoint.x1 - twoPoint.x2)) * 180 / Math.PI
      if (Math.abs(perAngle - curAngle) > 1) {
        that.setData({
          rotate: that.data.rotate + (curAngle - perAngle)
        })
      } else {
        // 计算距离，缩放
        var preDistance = Math.sqrt(Math.pow((preTwoPoint.x1 - preTwoPoint.x2), 2) + Math.pow((preTwoPoint.y1 - preTwoPoint.y2), 2))
        var curDistance = Math.sqrt(Math.pow((twoPoint.x1 - twoPoint.x2), 2) + Math.pow((twoPoint.y1 - twoPoint.y2), 2))
        that.setData({
          scale: that.data.scale + (curDistance - preDistance) * 0.005
        })
      }
    }
  },

  /**
  * 缩放结束
  */
  scaleEnd: function (e) {
    var that = this
    canOnePointMove = false
  },

  /**
  * 滑动开始
  */
  touchStart: function (e) {
    console.log(e);
    this.setData({
      "touch.x": e.changedTouches[0].clientX,
      "touch.y": e.changedTouches[0].clientY
    });
  },

  /**
 * 滑动结束
 */
  touchEnd: function (e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    let startX = this.data.touch.x;
    let startY = this.data.touch.y;
    const turn = getTouchData.getTouchData(endX, endY, startX, startY);
    if (turn == "left") {
      this.openAside();
    } else if (turn == "right") {
      this.closeAside();
    }
  },

  /**
  * 滑动过程
  */
  touchMove: function (e) {},

  /**
  * 跳转页面
  */
  navigate: function () {
    console.log(1)
    wx.navigateTo ({
      url: '/pages/collect/collect',
    })
  },

  /**
   * 关闭弹窗
   */
  closeDialog: function (e) {
    this.setData({
      modal: false
    })
  },

  /**
   * 图片点击预览
   */
  imgPreview: function(e) {
    console.log(e)
    const src = e.currentTarget.dataset.src;
    this.setData({
      scaleImage: src
    })
  },

  /**
   * 关闭图片预览
   */
  closePreview: function(e) {
    console.log(e)
    this.setData({
      scaleImage: null
    })
  },

  /**
   * 侧边栏点击滚动
   */
  scroll: function (e) {
    var current = e.currentTarget.id;
    this.setData({
      open: false
    });
    this.swiperChange(current);
  },

  /**
   * 轮播页面跳转
   */
  swiperChange(current) {
    const height = current * 600;
    wx.pageScrollTo({
      scrollTop: height,
      duration: 300
    })
  },

  /**
   * 引导控件
   * 可能需要改的
   */

  next: function (e) {
    this.setData({
      first: true,
      second: true
    })
  },

  last: function (e) {
    this.setData({
      guide: false
    })
  },

  // 打开指引页
  openGuide: function () {
    var time = 0;
    var that = this;

    that.setData({
      guide: true
    })

    var interval = setInterval(function () {
      time++;
      if (time == 3) {
        that.setData({
          first: true,
          second: true
        })
      } else if (time == 6) {
        that.setData({
          guide: false
        })
        clearInterval(interval);
      }
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // 获取浏览器缓存
    wx.getStorageInfo({
      success: function (res) {
        const recordFlag = res.keys[0];
        if (!recordFlag) {
          console.log(2)
          _this.setData({
            modal: true
          })
        } else {
          _this.openGuide();
        }
      }
    })
  },

  /**
   * 当页面滚动时
   */
  onPageScroll: function (res) {
    var height;
    var _this = this;

    console.log("滚动")

    wx.getSystemInfo({
      success: function (res) {
        height = res.windowHeight
      },
    })

    var str = Math.ceil(res.scrollTop / height);
    _this.data.gallery[str].show = true;
    console.log(_this.data.gallery)
    _this.setData({
      gallery: _this.data.gallery
    })
  },
})