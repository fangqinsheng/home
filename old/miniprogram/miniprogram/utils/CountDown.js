function getTime(_this, num) {
  _this.setData({
    status: true
  })
  let remain = num;
  const time = setInterval(function () {
    if (remain == 1) {
      clearInterval(time);
      _this.setData({
        sec: num,
        status: false
      })
    }
    remain--;
    _this.setData({
      sec: remain
    })
  }, 1000)
}

module.exports = {
  getTime
}