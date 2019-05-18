(function($) {

    'use strict';

    var Pages = function() {

        this.pageScrollElement = 'html, body';
        this.$body = $('body');

        this.setUserOS();
        this.setUserAgent();
    }

    // Set environment vars
    Pages.prototype.setUserOS = function() {
        var OSName = "";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
        if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
        if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";

        this.$body.addClass(OSName);
    }

    Pages.prototype.setUserAgent = function() {
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
            this.$body.addClass('mobile');
        } else {
            this.$body.addClass('desktop');
            if (navigator.userAgent.match(/MSIE 9.0/)) {
                this.$body.addClass('ie9');
            }
        }
    }

    // Pages util functions
    Pages.prototype.isVisibleXs = function() {
        (!$('#pg-visible-xs').length) && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />');
        return $('#pg-visible-xs').is(':visible');
    }

    Pages.prototype.isVisibleSm = function() {
        (!$('#pg-visible-sm').length) && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />');
        return $('#pg-visible-sm').is(':visible');
    }

    Pages.prototype.isVisibleMd = function() {
        (!$('#pg-visible-md').length) && this.$body.append('<div id="pg-visible-md" class="visible-md" />');
        return $('#pg-visible-md').is(':visible');
    }

    Pages.prototype.isVisibleLg = function() {
        (!$('#pg-visible-lg').length) && this.$body.append('<div id="pg-visible-lg" class="visible-lg" />');
        return $('#pg-visible-lg').is(':visible');
    }

    Pages.prototype.getUserAgent = function() {
        return $('body').hasClass('mobile') ? "mobile" : "desktop";
    }

    Pages.prototype.setFullScreen = function(element) {
        // Supports most browsers and their versions.
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

        if (requestMethod) { // Native full screen.
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    // Initialize Layout
    Pages.prototype.initDropDown = function() {
        // adjust width of each dropdown to match content width
        $('.dropdown-default').each(function() {
            var btn = $(this).find('.dropdown-menu').siblings('.dropdown-toggle');
            var offset = 0;

            var padding = btn.actual('innerWidth') - btn.actual('width');
            var menuWidth = $(this).find('.dropdown-menu').actual('outerWidth');

            if (btn.actual('outerWidth') < menuWidth) {
                btn.width(menuWidth - offset);
            } else {
                $(this).find('.dropdown-menu').width(btn.actual('outerWidth'));
            }
        });
    }

    Pages.prototype.initFormGroupDefault = function() {
        $('.form-group.form-group-default').click(function() {
            $(this).find(':input').focus();
        });
        $('body').on('focus', '.form-group.form-group-default :input', function() {
            $('.form-group.form-group-default').removeClass('focused');
            $(this).parents('.form-group').addClass('focused');
        });

        $('body').on('blur', '.form-group.form-group-default :input', function() {
            $(this).parents('.form-group').removeClass('focused');
            if ($(this).val()) {
                $(this).closest('.form-group').find('label').addClass('fade');
            } else {
                $(this).closest('.form-group').find('label').removeClass('fade');
            }
        });

        $('.form-group.form-group-default .checkbox, .form-group.form-group-default .radio').hover(function() {
            $(this).parents('.form-group').addClass('focused');
        }, function() {
            $(this).parents('.form-group').removeClass('focused');
        });
    }

    Pages.prototype.initSlidingTabs = function() {
        // TODO: move this to a separate file
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            //e = $(e.relatedTarget || e.target).parent().find('a[data-toggle=tab]');
            e = $(e.target).parent().find('a[data-toggle=tab]');

            var hrefPrev = e.attr('href');

            var hrefCurrent = e.attr('href');

            if (!$(hrefCurrent).is('.slide-left, .slide-right')) return;
            $(hrefCurrent).addClass('sliding');

            setTimeout(function() {
                $(hrefCurrent).removeClass('sliding');
            }, 100);
        });
    }


    Pages.prototype.initProgressBars = function() {
        $(window).on('load', function() {
            $('.progress-bar').each(function() {
                $(this).css('width', $(this).attr("data-percentage"));
            });
            // Hack: FF doesn't play SVG animations set as background-image
            $('.progress-bar-indeterminate, .progress-circle-indeterminate, .mapplic-pin').hide().show(0);
        });
    }

    Pages.prototype.initHorizontalMenu = function() {
        $(document).on("click", ".horizontal-menu .bar-inner > ul > li", function() {
            $(this).toggleClass("open").siblings().removeClass("open")
        }), $(".content").on("click", function() {
            $(".horizontal-menu .bar-inner > ul > li").removeClass("open")
        }), $('[data-pages="horizontal-menu-toggle"]').on("click touchstart", function(e) {
            e.preventDefault(), $("body").toggleClass("menu-opened")
        })
    }

        // Initialize Plugins
    Pages.prototype.initTooltipPlugin = function() {
        $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip();
    }

    Pages.prototype.initSelect2Plugin = function() {
        $.fn.select2 && $('[data-init-plugin="select2"]').each(function() {
            $(this).select2({
                minimumResultsForSearch: ($(this).attr('data-disable-search') == 'true' ? -1 : 1)
            }).on('select2-opening', function() {
                $.fn.scrollbar && $('.select2-results').scrollbar({
                    ignoreMobile: false
                })
            });
        });
    }

    Pages.prototype.initScrollBarPlugin = function() {
        $.fn.scrollbar && $('.scrollable').scrollbar({
            ignoreOverlay: false
        });
    }

    // Call initializers
    Pages.prototype.init = function() {
        // init layout
        this.initDropDown();
        this.initFormGroupDefault();
        this.initSlidingTabs();
        this.initProgressBars();
        this.initHorizontalMenu();
        // init plugins
        this.initTooltipPlugin();
        this.initSelect2Plugin();
        this.initScrollBarPlugin();
    }

    $.Pages = new Pages();
    $.Pages.Constructor = Pages;

})(window.jQuery);

/* ============================================================
 * Pages Circular Progress
 * ============================================================ */

(function($) {
    'use strict';
    // CIRCULAR PROGRESS CLASS DEFINITION
    // ======================

    var Progress = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.circularProgress.defaults, options);


        // start adding to to DOM
        this.$container = $('<div class="progress-circle"></div>');

        this.$element.attr('data-color') && this.$container.addClass('progress-circle-' + this.$element.attr('data-color'));
        this.$element.attr('data-thick') && this.$container.addClass('progress-circle-thick');

        this.$pie = $('<div class="pie"></div>');

        this.$pie.$left = $('<div class="left-side half-circle"></div>');
        this.$pie.$right = $('<div class="right-side half-circle"></div>');

        this.$pie.append(this.$pie.$left).append(this.$pie.$right);

        this.$container.append(this.$pie).append('<div class="shadow"></div>');

        this.$element.after(this.$container);
        // end DOM adding

        this.val = this.$element.val();
        var deg = perc2deg(this.val);


        if (this.val <= 50) {
            this.$pie.$right.css('transform', 'rotate(' + deg + 'deg)');
        } else {
            this.$pie.css('clip', 'rect(auto, auto, auto, auto)');
            this.$pie.$right.css('transform', 'rotate(180deg)');
            this.$pie.$left.css('transform', 'rotate(' + deg + 'deg)');
        }

    }
    Progress.VERSION = "1.0.0";

    Progress.prototype.value = function(val) {
        if (typeof val == 'undefined') return;

        var deg = perc2deg(val);

        this.$pie.removeAttr('style');

        this.$pie.$right.removeAttr('style');
        this.$pie.$left.removeAttr('style');

        if (val <= 50) {
            this.$pie.$right.css('transform', 'rotate(' + deg + 'deg)');
        } else {
            this.$pie.css('clip', 'rect(auto, auto, auto, auto)');
            this.$pie.$right.css('transform', 'rotate(180deg)');
            this.$pie.$left.css('transform', 'rotate(' + deg + 'deg)');
        }

    }

    // CIRCULAR PROGRESS PLUGIN DEFINITION
    // =======================
    function Plugin(option) {
        return this.filter(':input').each(function() {
            var $this = $(this);
            var data = $this.data('pg.circularProgress');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('pg.circularProgress', (data = new Progress(this, options)));
            if (typeof option == 'string') data[option]();
            else if (options.hasOwnProperty('value')) data.value(options.value);
        })
    }

    var old = $.fn.circularProgress

    $.fn.circularProgress = Plugin
    $.fn.circularProgress.Constructor = Progress


    $.fn.circularProgress.defaults = {
        value: 0
    }

    // CIRCULAR PROGRESS NO CONFLICT
    // ====================

    $.fn.circularProgress.noConflict = function() {
        $.fn.circularProgress = old;
        return this;
    }

    // CIRCULAR PROGRESS DATA API
    //===================

    $(window).on('load', function() {
        $('[data-pages-progress="circle"]').each(function() {
            var $progress = $(this)
            $progress.circularProgress($progress.data())
        })
    })

    function perc2deg(p) {
        return parseInt(p / 100 * 360);
    }

    // TODO: Add API to change size, stroke width, color

})(window.jQuery);

/* ============================================================
 * Pages Parallax Plugin
 * ============================================================ */

(function($) {
    'use strict';
    // PARALLAX CLASS DEFINITION
    // ======================

    var Parallax = function(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.parallax.defaults, options);
        this.$coverPhoto = this.$element.find('.cover-photo');
        // TODO: rename .inner to .page-cover-content
        this.$content = this.$element.find('.inner');

        // if cover photo img is found make it a background-image
        if (this.$coverPhoto.find('> img').length) {
            var img = this.$coverPhoto.find('> img');
            this.$coverPhoto.css('background-image', 'url(' + img.attr('src') + ')');
            img.remove();
        }

    }
    Parallax.VERSION = "1.0.0";

    Parallax.prototype.animate = function() {

        var scrollPos;
        var pagecoverWidth = this.$element.height();
        //opactiy to text starts at 50% scroll length
        var opacityKeyFrame = pagecoverWidth * 50 / 100;
        var direction = 'translateX';

        scrollPos = $(window).scrollTop();
        direction = 'translateY';


        this.$coverPhoto.css({
            'transform': direction + '(' + scrollPos * this.options.speed.coverPhoto + 'px)'
        });

        this.$content.css({
            'transform': direction + '(' + scrollPos * this.options.speed.content + 'px)',
        });

        if (scrollPos > opacityKeyFrame) {
            this.$content.css({
                'opacity': 1 - scrollPos / 1200
            });
        } else {
            this.$content.css({
                'opacity': 1
            });
        }

    }

    // PARALLAX PLUGIN DEFINITION
    // =======================
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('pg.parallax');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('pg.parallax', (data = new Parallax(this, options)));
            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.parallax

    $.fn.parallax = Plugin
    $.fn.parallax.Constructor = Parallax


    $.fn.parallax.defaults = {
        speed: {
            coverPhoto: 0.3,
            content: 0.17
        }
    }

    // PARALLAX NO CONFLICT
    // ====================
    
    $.fn.parallax.noConflict = function() {
        $.fn.parallax = old;
        return this;
    }

    // PARALLAX DATA API
    //===================

    $(window).on('load', function() {

        $('[data-pages="parallax"]').each(function() {
            var $parallax = $(this)
            $parallax.parallax($parallax.data())
        })
    });

    $(window).on('scroll', function() {
        // Disable parallax for Touch devices
        if (Modernizr.touch) {
            return;
        }
        $('[data-pages="parallax"]').parallax('animate');
    });

})(window.jQuery);
 /* ============================================================
  * Pages Sidebar
  * ============================================================ */

 (function($) {
     'use strict';
     // SIDEBAR CLASS DEFINITION
     // ======================

     var Sidebar = function(element, options) {
        
         this.$element = $(element);
         this.options = $.extend(true, {}, $.fn.sidebar.defaults, options);

         this.bezierEasing = [.05, .74, .27, .99];
         this.cssAnimation = true;
         this.menuClosedCSS;
         this.menuOpenCSS;
         this.css3d = true;

         this.sideBarWidth = 280;
         this.sideBarWidthCondensed = 280 - 70;

         this.$sidebarMenu = this.$element.find('.sidebar-menu > ul');
      
         this.$pageContainer = $(this.options.pageContainer);
         this.$body = $('body');

         if (!this.$sidebarMenu.length) return;

         // apply perfectScrollbar plugin only for desktops
         ($.Pages.getUserAgent() == 'desktop') && this.$sidebarMenu.scrollbar({
             ignoreOverlay:false
         });


         if (!Modernizr.csstransitions)
             this.cssAnimation = false;
         if (!Modernizr.csstransforms3d)
             this.css3d = false;

         this.menuOpenCSS = (this.css3d == true ? 'translate3d(' + this.sideBarWidthCondensed + 'px, 0,0)' : 'translate(' + this.sideBarWidthCondensed + 'px, 0)');
         this.menuClosedCSS = (this.css3d == true ? 'translate3d(0, 0,0)' : 'translate(0, 0)');


         // Bind events
         // Toggle sub menus
         this.$sidebarMenu.find('li > a').on('click', function(e) {

             if ($(this).parent().children('.sub-menu') === false) {
                 return;
             }

             var parent = $(this).parent().parent();
             var tempElem = $(this).parent();

             parent.children('li.open').children('a').children('.arrow').removeClass('open');
             parent.children('li.open').children('a').children('.arrow').removeClass('active');
             parent.children('li.open').children('.sub-menu').slideUp(200, function() {

             });
             parent.children('li').removeClass('open');
             var sub = $(this).parent().children('.sub-menu');
             if (sub.is(":visible")) {
                 $('.arrow', $(this)).removeClass("open");

                 sub.slideUp(200, function() {
                     $(this).parent().removeClass("active");
                 });
             } else {
                 $('.arrow', $(this)).addClass("open");
                 $(this).parent().addClass("open");
                 sub.slideDown(200, function() {});
             }
             //e.preventDefault();
         });

         // Toggle sidebar
         $('.sidebar-slide-toggle').on('click touchend',function(e) {
            e.preventDefault();
             $(this).toggleClass('active');
             var el = $(this).attr('data-pages-toggle');
             if (el != null) {
                 $(el).toggleClass('show');
             }
         });

         var _this = this;

         function sidebarMouseEnter(e) {
             if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                 return false
             }
             if ($('.close-sidebar').data('clicked')) {
                 return;
             }
             if (_this.$body.hasClass('menu-pin'))
                 return;
             if (_this.cssAnimation) {
                 _this.$element.css({
                     'transform': _this.menuOpenCSS
                 });
                 _this.$body.addClass('sidebar-visible');
             } else {
                 _this.$element.stop().animate({
                     left: '0px'
                 }, 400, $.bez(_this.bezierEasing), function() {
                     _this.$body.addClass('sidebar-visible');
                 });
             }
         }

         function sidebarMouseLeave(e) {
             if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                 return false
             }
             if (typeof e != 'undefined') {
                 var target = $(e.target);
                 if (target.parent('.page-sidebar').length) {
                     return;
                 }
             }
             if (_this.$body.hasClass('menu-pin'))
                 return;

             if ($('.sidebar-overlay-slide').hasClass('show')) {
                 $('.sidebar-overlay-slide').removeClass('show')
                 $("[data-pages-toggle']").removeClass('active')

             }

             if (_this.cssAnimation) {
                 _this.$element.css({
                     'transform': _this.menuClosedCSS
                 });
                 _this.$body.removeClass('sidebar-visible');
             } else {

                 _this.$element.stop().animate({
                     left: '-' + _this.sideBarWidthCondensed + 'px'
                 }, 400, $.bez(_this.bezierEasing), function() {

                     _this.$body.removeClass('sidebar-visible')
                     setTimeout(function() {
                         $('.close-sidebar').data({
                             clicked: false
                         });
                     }, 100);
                 });
             }
         }


         this.$element.bind('mouseenter mouseleave', sidebarMouseEnter);
         this.$pageContainer.bind('mouseover', sidebarMouseLeave);

     }


     // Toggle sidebar for mobile view   
     Sidebar.prototype.toggleSidebar = function(toggle) {
         var timer;
         if (this.$body.hasClass('sidebar-open')) {
             this.$body.removeClass('sidebar-open');
             timer = setTimeout(function() {
                 this.$element.removeClass('visible');
             }.bind(this), 400);
         } else {
             clearTimeout(timer);
             this.$element.addClass('visible');
             setTimeout(function() {
                 this.$body.addClass('sidebar-open');
             }.bind(this), 10);

         }

     }

     Sidebar.prototype.togglePinSidebar = function(toggle) {
         if (toggle == 'hide') {
             this.$body.removeClass('menu-pin');
         } else if (toggle == 'show') {
             this.$body.addClass('menu-pin');
         } else {
             this.$body.toggleClass('menu-pin');
         }

     }


     // SIDEBAR PLUGIN DEFINITION
     // =======================
     function Plugin(option) {
         return this.each(function() {
             var $this = $(this);
             var data = $this.data('pg.sidebar');
             var options = typeof option == 'object' && option;

             if (!data) $this.data('pg.sidebar', (data = new Sidebar(this, options)));
             if (typeof option == 'string') data[option]();
         })
     }

     var old = $.fn.sidebar;

     $.fn.sidebar = Plugin;
     $.fn.sidebar.Constructor = Sidebar;


     $.fn.sidebar.defaults = {
         pageContainer: '.page-container'
     }

     // SIDEBAR PROGRESS NO CONFLICT
     // ====================

     $.fn.sidebar.noConflict = function() {
         $.fn.sidebar = old;
         return this;
     }

     // SIDEBAR PROGRESS DATA API
     //===================

     $(document).on('ready', function() {
         $('[data-pages="sidebar"]').each(function() {
             var $sidebar = $(this)
             $sidebar.sidebar($sidebar.data())
         })
     })

     $(document).on('click.pg.sidebar.data-api', '[data-toggle-pin="sidebar"]', function(e) {
         e.preventDefault();
         var $this = $(this);
         var $target = $('[data-pages="sidebar"]');
         $target.data('pg.sidebar').togglePinSidebar();
         return false;
     })
     $(document).on('click.pg.sidebar.data-api touchstart', '[data-toggle="sidebar"]', function(e) {
         e.preventDefault();
         var $this = $(this);
         var $target = $('[data-pages="sidebar"]');
         $target.data('pg.sidebar').toggleSidebar();
         return false
     })

 })(window.jQuery);

(function($) {
    'use strict';
    // Initialize layouts and plugins
    $.Pages.init();
})(window.jQuery);