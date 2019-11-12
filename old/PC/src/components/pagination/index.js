/**
 * @file        基于jQuery的分页组件
 * @author      钦昇 <1105813323@qq.com>
 * @version     1.0.0
 */
!function(t, a, e, i) {
    var n = function(a, e) {
        this.ele = a,
            this.defaults = {
                currentPage: 1,
                totalPage: 10,
                isShow: !0,
                count: 5,
                homePageText: "首页",
                endPageText: "尾页",
                prevPageText: "上一页",
                nextPageText: "下一页",
                callback: function() {}
            },
            this.opts = t.extend({},
                this.defaults, e),
            this.current = this.opts.currentPage,
            this.total = this.opts.totalPage,
            this.init()
    };
    n.prototype = {
        init: function() {
            this.render(),
                this.eventBind()
        },
        render: function() {
            var t = this.opts,
                a = this.current,
                e = this.total,
                i = this.getPagesTpl(),
                n = this.ele.empty();
            this.isRender = !0,
                this.homePage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="1">' + t.homePageText + "</a>",
                this.prevPage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + (a - 1) + '">' + t.prevPageText + "</a>",
                this.nextPage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + (a + 1) + '">' + t.nextPageText + "</a>",
                this.endPage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + e + '">' + t.endPageText + "</a>",
                this.checkPage(),
            this.isRender && n.html("<div class='ui-pagination-container'>" + this.homePage + this.prevPage + i + this.nextPage + this.endPage + "</div>")
        },
        checkPage: function() {
            var t = this.opts,
                a = this.total,
                e = this.current;
            t.isShow || (this.homePage = this.endPage = ""),
            1 === e && (this.homePage = this.prevPage = ""),
            e === a && (this.endPage = this.nextPage = ""),
            1 === a && (this.homePage = this.prevPage = this.endPage = this.nextPage = ""),
            a <= 1 && (this.isRender = !1)
        },
        getPagesTpl: function() {
            var t = this.opts,
                a = this.total,
                e = this.current,
                i = "",
                n = t.count;
            if (a <= n) for (g = 1; g <= a; g++) i += g === e ? '<a href="javascript:void(0);" class="ui-pagination-page-item active" data-current="' + g + '">' + g + "</a>": '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + g + '">' + g + "</a>";
            else {
                var s = n / 2;
                if (e <= s) for (g = 1; g <= n; g++) i += g === e ? '<a href="javascript:void(0);" class="ui-pagination-page-item active" data-current="' + g + '">' + g + "</a>": '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + g + '">' + g + "</a>";
                else {
                    var r = Math.floor(s),
                        h = e + r,
                        o = e - r,
                        c = n % 2 == 0;
                    h > a && (c ? (o -= h - a - 1, h = a + 1) : (o -= h - a, h = a)),
                    c || h++;
                    for (var g = o; g < h; g++) i += g === e ? '<a href="javascript:void(0);" class="ui-pagination-page-item active" data-current="' + g + '">' + g + "</a>": '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + g + '">' + g + "</a>"
                }
            }
            return i
        },
        setPage: function(t, a) {
            return t === this.current && a === this.total ? this.ele: (this.current = t, this.total = a, this.render(), this.ele)
        },
        getPage: function() {
            return {
                current: this.current,
                total: this.total
            }
        },
        eventBind: function() {
            var a = this,
                e = this.opts.callback;
            this.ele.off("click").on("click", ".ui-pagination-page-item",
                function() {
                    var i = t(this).data("current");
                    a.current != i && (a.current = i, a.render(), e && "function" == typeof e && e(i))
                })
        }
    },
        t.fn.pagination = function(t, a, e) {
            if ("object" == typeof t) {
                var i = new n(this, t);
                this.data("pagination", i)
            }
            return "string" == typeof t ? this.data("pagination")[t](a, e) : this
        }
} (jQuery, window, document);