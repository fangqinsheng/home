/* =======================================================================
 * jQuery.QsClick
 * 仿hover封装的的toggleClass
 * Copyright 2019
 * 用于鼠标悬停时使用的脚本
 * ========================================================================*/
!function($) {
  $.fn.QSClick = function(option, callback){

    const defaults = {
      className: "active",
    };
    const options = $.extend(defaults, option);

    this.each(function(){
      const that = $(this);
      that.on("click", function(e) {
        e.preventDefault(); // 组织默认行为，防止点击click出现两次
        that.toggleClass(options.className);
        if(callback){
          callback();
        }
      });
    });
  }
} (window.jQuery);
