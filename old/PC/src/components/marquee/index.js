/* =======================================================================
 * jQuery.uiMarquee
 * 使用h-ui的封装脚本
 * Copyright 2019
 * 用于鼠标悬停时使用的脚本
 * ========================================================================*/
!function ($) {
  $.uiMarquee = function(height,speed,delay){
    let scrollT;
    let pause = false;
    const ScrollBox = document.getElementById("marquee");
    if(document.getElementById("holder").offsetHeight <= height) return;
    const _tmp = ScrollBox.innerHTML.replace('holder', 'holder2');
    ScrollBox.innerHTML += _tmp;
    ScrollBox.onmouseover = function(){pause = true};
    ScrollBox.onmouseout = function(){pause = false};
    ScrollBox.scrollTop = 0;
    const start = function(){
      scrollT = setInterval(scrolling,speed);
      if(!pause) ScrollBox.scrollTop += 2};
    const scrolling = function(){
      if(ScrollBox.scrollTop % height !== 0){
        ScrollBox.scrollTop += 2;
        if(ScrollBox.scrollTop >= ScrollBox.scrollHeight/2) ScrollBox.scrollTop = 0}
      else{
        clearInterval(scrollT);
        setTimeout(start,delay)}
    };
    setTimeout(start,delay)}
}(window.jQuery);
