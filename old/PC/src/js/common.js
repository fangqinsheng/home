// 页面节点重新加载
window.onload = function() {
    // 页面开始滚动
    $(window).on("scroll", function() {
        checkPosition($(window).height());
    });
    // tab选项卡
    $(".tab").tab();
    // 后台侧边栏
    $(".admin-aside dd a").each(function() {
        var $this = $(this);
        if ($this[0].href === String(window.location.href)) {
            $this.addClass("on");
        }
    });
    // 二级栏目控制
    $(".menu .inner").each(function() {
        console.log(1);
        $(this)
            .mouseover(function() {
                $(this).addClass("is-hover");
            })
            .mouseout(function() {
                $(this).removeClass("is-hover");
            });
    });
    // 栏目控制
    $("#menu").hover(function () {
        if(!$(this).hasClass("index")) {
            $(".menu").slideDown();
        } else {
            return false;
        }
    },function(){
        if(!$(this).hasClass("index")) {
            $(".menu").slideUp();
        } else {
            return false;
        }
    });
    // 侧边栏鼠标咦过去显影
    $(".siteBar .item").each(function() {
        $(this).mouseover(function() {
            $(this).addClass("is-hover");
        }).mouseout(function() {
            $(this).removeClass("is-hover");
        });
    });
  // 购物车显影
  $(".trolley-btn")
    .mouseover(function() {
      $(".trolley-content").show();
      // $(this).parent.css("box-shadow", "0 0 0 4px")
    })
    .mouseout(function() {
      $(".trolley-content").hide();
    });
};

// 鼠标悬停
$(".g-hover").QsHover();

// select初始化
$('.filter-box').selectFilter({
  callBack : function (val){
    //返回选择的值
    console.log(val+'-是返回的值')
  }
});

// 添加收藏夹
let addCollect = () => {
    const url = window.location || 'http://www.welshine.com';
    const title = document.title;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
        try{
            window.external.addFavorite(url, title);
        }catch(e){
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
};

// 意见反馈
let feedback = () => {
    const content = '<div class="feedback"><div class="feedback-title"><span>意见反馈</span></div><div class="feedback-box"><div class="row"><select name="type" title=""><option value="请选择">请选择</option><option value="资金问题">资金问题</option><option value="产品质量">产品质量</option><option value="快递物流">快递物流</option><option value="客服态度">客服态度</option><option value="网站设计">网站设计</option></select></div><div class="feedback-label">您的问题与建议</div><div class="row"><textarea name="" maxlength="300" placeholder="您的建议是我们前行的动力。我们会您的建议择优选择哦~" title=""></textarea></div><div class="feedback-label">您的联系方式</div><div class="row"><input type="text" title="" class="txt-input" placeholder="请输入您的邮箱或者手机号码"></div><div class="row"><div class="feedback-valid"><input type="text" title="" class="identify"><img src="https://dummyimage.com/74x32/000/fff" class="vac" alt="74x32" width="74" height="32"><a href="" class="btn--txt g-refresh">换一张</a></div><div class="fr"><a href="" class="btn btn--red">提交</a></div></div></div></div>';
    $.dialog({
        id: "feedback",
        hideHeader: true,
        content: content
    });
};

// 返回顶部点击
let goTop = () => {
    $("html,body").animate(
        {
            scrollTop: 0
        },
        800
    );
};

// 核对位置
let checkPosition = H => {
    if ($(window).scrollTop() > H) {
        $("#go-top").fadeIn();
    } else {
        $("#go-top").fadeOut();
    }
};

// 加入进货单
let addTrolley = () => {

};

// 列表页
$(function() {
    $(".f-sort a").each(function() {
        $(this).click(function() {
            $(".f-sort a").removeClass("current");
            $(this).addClass("current");
        });
    });
    $(".f-sort--up").attr("class", function() {
        return $(this)
            .attr("class")
            .replace("f-sort--up", "f-sort--down");
    });
    $(".f-sort--down").attr("class", function() {
        return $(this)
            .attr("class")
            .replace("f-sort--down", "f-sort--up");
    });
});
