const plussub = $(".plussub input");  // 全局变量
const subBtn = $(".sub");

function sub() {
  let num = plussub.val();
  if (num > 1) {
    if (num === 1) {
      return;
    }
    num--;
    plussub.val(num);
  } else {
    subBtn.addClass("disabled")
  }
}

function plus() {
  let num = plussub.val();
  if (num >= 99) {
    alert("一次最多购买99件");
    plussub.val(99);
  } else {
    num++;
    subBtn.removeClass("disabled");
    plussub.val(num);
  }
}

function changeNum() {
  let num = plussub.val();
  const reg = /^[0-9]*$/;
  reg.test(num);
  if (reg.test(num) === false) {
    alert("请输入有效数量！");
    plussub.val(1);
  } else if (num > 99) {
    alert("一次最多购买99件");
    plussub.val(99);
  }
}

plussub.bind("keypress", function () {
  if(event.keyCode === 13) {
    // alert("")
    changeNum();
  }
});
