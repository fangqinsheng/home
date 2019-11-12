/* =======================================================================
 * jQuery.QsHover
 * 使用h-ui的封装脚本
 * Copyright 2019
 * 用于鼠标悬停时使用的脚本
 * ========================================================================*/
!function($) {
  $.fn.QsHover = function(option, callback1, callback2){
    const defaults = {
      className: "active",
    };
    const options = $.extend(defaults, option);
    this.each(function(){
      const that = $(this);
      that.hover(function() {
          that.addClass(options.className);
          if(callback1){
            callback1();
          }
        },
        function() {
          that.removeClass(options.className);
          if(callback2){
            callback2();
          }
        });
    });
  }
} (window.jQuery);
