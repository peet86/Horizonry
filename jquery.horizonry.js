(function ($) {
    $.horizonry = function (el, options) {
        var base = this;

        base.$el = $(el);
        base.el = el;

        base.columns = 0;

        base.cols = [];

        base.$el.data("horizonry", base);

        base.init = function () {
            base.options = $.extend({}, $.horizonry.defaultOptions, options);

            base.$children = base.$el.children("." + base.options.itemSelector);

            base.$children_first = base.$children.first();

            base.window_width = $(window).width();

            // initial sort
            base.sort();
        };

        // resize listener
        $(window).resize(function (e) {
            // horizontal resize only
            if ($(window).width() == base.window_width) return;
            base.window_width = $(window).width();

            // delay 500ms
            if (this.resizeTo) clearTimeout(this.resizeTo);

            this.resizeTo = setTimeout(function () {
                $(this).trigger('resizeEnd');
            }, 500);
        });

        // resize end listener
        $(window).bind('resizeEnd', function () {
            base.reset();
            base.sort();
        });

        base.getCols = function ($this) {
            var containerwidth = base.$el.width(),
                itemwidth = base.$children_first.width(),
                left = base.$children_first.position().left - base.$el.position().left,
                totalwidth = left + itemwidth;

            var r = Math.round(containerwidth / totalwidth);
            return r;
        };


        // first in a column
        base.moveFirst = function ($this) {
            $this.addClass(base.options.firstItemSelector);
            base.cols.push($this.height());
        }

        // basic masonry logic (min. height column)
        base.moveMasonry = function ($this) {
            // min height col
            var minh = Math.min.apply(Math, base.cols),
                mincol = base.cols.indexOf(minh);

            // if last column append to the end
            if ((mincol + 1) == base.cols.length) {
                base.$el.append($this);
                // insert before the next "first item"
            } else {
                var bfselector = "." + base.options.firstItemSelector + ":eq(" + (mincol + 1) + ")",
                    bf = base.$el.find(bfselector);
                $this.insertBefore(bf[0]);
            }
            base.cols[mincol] += $this.height();
        };

        // reset order
        base.reset = function ($children) {
            base.cols = [];
            base.$children.removeClass(base.options.firstItemSelector);
            base.$el.append(base.$children.sort(function (a, b) {
                return $(a).attr("data-horizonrypos") - $(b).attr("data-horizonrypos");
            }));
        };

        base.sort = function () {
            // get possible column number
            base.columns = base.getCols();

            // get the children
            base.$children.each(function (i) {
                var $this = $(this);

                // set original position for later
                $this.attr("data-horizonrypos", i);

                // if the column will be visible 
                if (i <= (base.columns - 1)) {
                    base.moveFirst($this);
                } else {
                    base.moveMasonry($this);

                }
            });
        }

        base.init();
    };

    $.horizonry.defaultOptions = {
        itemSelector: "item",
        firstItemSelector: "item-first",
    };

    $.fn.horizonry = function (options) {
        return this.each(function () {
            (new $.horizonry(this, options));
        });
    };

})(jQuery);
