window.onload = function () {
    $("#slider").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: "linear"
        // autoplay: true,
        // autoplaySpeed: 3000
    });
    $(".article--l .bd").slick();
    $(".article--r .bd").slick({
        dots: true,
        arrows: false
    });

  // 购物车显影
  $(".settleup").mouseover(function() {
      $(".trolley-content").show();
      $(this).addClass("hover");
    }).mouseout(function() {
      $(".trolley-content").hide();
      $(this).removeClass("hover");
    });


};

window.onresize = function() {
  const banner = document.getElementById("banner");

  const w = document.body.clientWidth;
  console.log(w);
  if(w>1170) {
    banner.style.width = w + "px";
  } else {
    banner.style.width = "117 0px"
  }

};

