;(function() {
  /**
     *	作者	: 方帅
     * 	日期	: 改：2018-12-14
     *	版本	: v1.0
     * 	兼容性  : IE6+
     *   ******* :1. 更改获取图片方式，以小图li为基础通过自定义属性data-minSrc和data-maxSrc来获取,
     2. 修复safari bug
     */
  var EventUtil, Get, Element;

  EventUtil = {
    addHandler: function(ele, type, handler) {
      if (ele.addEventListener) {
        ele.addEventListener(type, handler, false);
      } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, handler);
      } else {
        ele["on" + type] = handler;
      }
    },
    removeHandler: function(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    },
    getEvent: function(event) {
      return event ? event : window.event;
    },
    getTarget: function(event) {
      return event.target || event.srcElement;
    },
    preventDefault: function(event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    }
  };

  Get = {
    byId: function(id) {
      return typeof id === "string" ? document.getElementById(id) : id;
    },
    byClass: function(sClass, oParent) {
      var aClass = [];
      var reClass = new RegExp("(^| )" + sClass + "( |$)");
      var aElem = this.byTagName("*", oParent);
      for (var i = 0; i < aElem.length; i++)
        reClass.test(aElem[i].className) && aClass.push(aElem[i]);
      return aClass;
    },
    byTagName: function(elem, obj) {
      return (obj || document).getElementsByTagName(elem);
    }
  };

  Element = {
    hasClass: function(obj, name) {
      return (" " + obj.className + " ").indexOf(" " + name + " ") > -1;
    },
    addClass: function(obj, name) {
      if (this.hasClass(obj, name)) return;
      obj.className += " " + name;
    },
    removeClass: function(obj, name) {
      obj.className = obj.className
        .replace(new RegExp("(^|\\s)" + name + "(?:\\s|$)"), "$1")
        .replace(/\s{1,}/g, " ");
    }
  };

  function Magnify() {
    this.init.apply(this, arguments);
  }

  Magnify.prototype = {
    init: function(id) {
      var _this = this;
      this.magWrap = Get.byId(id);
      this.magMain = this.magWrap.children[0];
      this.mW = this.magMain.offsetWidth;
      this.mH = this.magMain.offsetHeight;

      this.magImg = this.magMain.getElementsByTagName("img")[0];
      this.mImgSrc = this.magImg.getAttribute("data-src");

      this.specBox = Get.byClass("thumbnail", this.magWrap)[0];
      this.specUl = this.specBox.getElementsByTagName("ul")[0];
      this.specItem = this.specBox.getElementsByTagName("li");

      _this.specFn();
      _this.setEventFn().dragEvent();
    },
    setEleFn: function() {
      var _this = this,
        _html1 = "",
        oFrag = document.createDocumentFragment(), // 创建一个虚拟节点
        oFrag2 = document.createDocumentFragment();
      if (_this.magMain.children[2]) {
        return;
      } else {
        _this.oMD = document.createElement("div");
        _this.oMD.className = "MagnifierDrag";
        _this.oMD.style.cssText =
          "width:" + _this.mW / 2 + "px;height:" + _this.mH / 2 + "px;";
        _this.oMD.innerHTML = "&nbsp;";

        _this.oMP = document.createElement("div");
        _this.oMP.className = "MagnifierPop";
        _this.oMP.style.cssText =
          "width:" +
          _this.mW +
          "px;height:" +
          _this.mH +
          "px;right:" +
          (-_this.mW - 1) +
          "px;";

        _this.oMI = document.createElement("div");
        _this.oMI.className = "MagnifierImg";
        _this.oMI.style.cssText =
          "width:" + _this.mW * 2 + "px;height:" + _this.mH * 2 + "px;";
        _html1 =
          '<img style="width:100%;height:100%;" src="' + _this.mImgSrc + '">';
        _this.oMI.innerHTML = _html1;

        _this.oMP.appendChild(_this.oMI);

        oFrag.appendChild(_this.oMD);
        oFrag2.appendChild(_this.oMP);

        _this.magMain.appendChild(oFrag);
        _this.magWrap.appendChild(oFrag2);
      }
    },
    removeFn: function(event) {
      var _this = this;
      var target = EventUtil.getTarget(event);
      if (target.nodeName == "IMG") {
        return;
      } else {
        _this.magMain.removeChild(_this.oMD);
        _this.magWrap.removeChild(_this.oMP);
      }
    },
    setMousemoveFn: function(event) {
      var _this = this,
        _WinScrLeft =
          document.documentElement.scrollLeft || document.body.scrollLeft,
        _WinScrTop =
          document.documentElement.scrollTop || document.body.scrollTop;

      _x =
        event.clientX +
        _WinScrLeft -
        (_this.magWrap.getBoundingClientRect().left + _WinScrLeft) -
        _this.oMD.offsetWidth / 2;

      _y =
        event.clientY +
        _WinScrTop -
        (_this.magMain.getBoundingClientRect().top + _WinScrTop) -
        _this.oMD.offsetHeight / 2;

      _l = _this.magMain.offsetWidth - _this.oMD.offsetWidth;
      _t = _this.magMain.offsetHeight - _this.oMD.offsetHeight;

      _l2 = -(_this.oMI.offsetWidth - _this.magMain.offsetWidth);
      _t2 = -(_this.oMI.offsetHeight - _this.magMain.offsetHeight);

      if (_x < 0) {
        _x = 0;
      } else if (_x > _l) {
        _x = _l;
      }

      if (_y < 0) {
        _y = 0;
      } else if (_y > _t) {
        _y = _t;
      }

      _this.oMD.style.left = _x + "px";
      _this.oMD.style.top = _y + "px";

      _bigx = _x / _l;
      _bigy = _y / _t;

      _this.oMI.style.left = _bigx * _l2 + "px";
      _this.oMI.style.top = _bigy * _t2 + "px";
    },
    setEventFn: function() {
      var _this = this,
        _x = 0,
        _y = 0,
        _l = 0,
        _t = 0,
        _bigx = 0,
        _bigy = 0,
        _l2 = 0,
        _t2 = 0;

      function handleEvent(event) {
        events = EventUtil.getEvent(event);
        switch (event.type) {
          case "mouseover":
            _this.setEleFn();
            break;
          case "mousemove":
            if (_this.oMD) {
              _this.setMousemoveFn(event);
            }
            break;
          case "mouseout":
            _this.removeFn(event);
            break;
        }
      }
      return {
        dragEvent: function() {
          EventUtil.addHandler(_this.magMain, "mouseover", handleEvent);
          EventUtil.addHandler(_this.magMain, "mousemove", handleEvent);
          EventUtil.addHandler(_this.magMain, "mouseout", handleEvent);
        }
      };
    },
    specFn: function() {
      var _this = this,
        _oSpImg,
        _oISrc,
        _oMaxSrc,
        oLBtn = Get.byClass("icon-l-arrow", _this.magWrap)[0],
        oRBtn = Get.byClass("icon-r-arrow", _this.magWrap)[0],
        oLiW = this.specUl.getElementsByTagName("li")[0].offsetWidth + 5,
        _len = _this.specItem.length,
        n = 0,
        l = null,
        r = null;
      function TabFn(event) {
        var target = EventUtil.getTarget(event);
        if (target.nodeName != "UL") {
          if (target.nodeName == "IMG") {
            target = target.parentNode;
          }
          for (var i = 0; i < _len; i++) {
            _this.specItem[i].className = "thumbnail-item";
          }
          target.className = "thumbnail-item on";

          _oSpImg = target.getElementsByTagName("img")[0];

          _oISrc = _oSpImg.getAttribute("data-minSrc");
          _oMaxSrc = _oSpImg.getAttribute("data-maxSrc");
          //data-lsrc data-maxSrc
          _this.magImg.setAttribute("src", _oISrc);
          //_this.mImgSrc = _oMaxSrc;
          _this.magImg.setAttribute("data-src", _oMaxSrc);
          var a = (_this.mImgSrc = _this.magImg.getAttribute("data-src"));
        }
      }
      EventUtil.addHandler(_this.specUl, "mouseover", TabFn);

      function moveFn(event) {
        var target = EventUtil.getTarget(event);
        if (target.className.indexOf("icon-r-arrow") > -1) {
          r = ++n;
          if (r > _len - 5) Element.removeClass(target, "on");

          if (r > _len - 4) {
            n = _len - 4;
            return false;
          } else {
            _this.buttur(_this.specUl, { left: -(r * oLiW) });
            Element.addClass(oLBtn, "on");
          }
        }
        if (target.className.indexOf("icon-l-arrow") > -1) {
          l = --n;
          if (l < 1) Element.removeClass(target, "on");

          if (l < 0) {
            n = 0;
            return false;
          } else {
            _this.buttur(_this.specUl, { left: -(l * oLiW) });
            Element.addClass(oRBtn, "on");
          }
        }
      }

      if (_len > 4) {
        Element.addClass(oRBtn, "on");
        EventUtil.addHandler(_this.magWrap, "click", moveFn);
      }
    },
    buttur: function(ele, obj) {
      window.clearTimeout(ele.timer);

      var _this = this,
        end = null;

      for (direc in obj) {
        var direc1 = direc.toLowerCase(),
          strOffset =
            "offset" +
            direc1.substr(0, 1).toUpperCase() +
            direc1.substring(1).toLowerCase(),
          target = obj[direc],
          nSpeed = (target - ele[strOffset]) / 8;

        nSpeed = nSpeed >= 0 ? Math.ceil(nSpeed) : Math.floor(nSpeed);
        ele.style[direc1] = ele[strOffset] + nSpeed + "px";
        end += nSpeed;
      }

      if (end)
        if (typeof fnCallback == "function") {
          fnCallback.call(ele);
        } else {
          ele.timer = window.setTimeout(function() {
            _this.buttur(ele, obj);
          }, 20);
        }
    }
  };

  window["Magnify"] = function(id) {
    return new Magnify(id);
  };

  function Carousel() {
    this.init.apply(this, arguments);
  }

  Carousel.prototype = {
    init: function(id) {
      var _this = this;
      this.sliderWrap = Get.byId(id);
    }
  };
})();
