/* ====================================================
 * jQuery is in viewport.
 *
 * https://github.com/frontid/jQueryIsInViewport
 * Marcelo Iván Tosco (capynet)
 * Inspired on https://stackoverflow.com/a/40658647/1413049
 * ==================================================== */
!function ($) {
  'use strict';

  const IsInViewport = function (el, cb, offset) {
    this.$el = $(el);
    this.cb = cb;
    this.offset = offset;
    this.watch();
    return this;
  };

  IsInViewport.prototype = {

    /**
     * Checks if the element is in.
     *
     * @returns {boolean}
     */
    isIn: function isIn() {
      const _self = this;
      const $win = $(window);
      const elementTop = _self.$el.offset().top - _self.offset;
      const elementBottom = elementTop + _self.$el.outerHeight();
      const viewportTop = $win.scrollTop();
      const viewportBottom = viewportTop + $win.height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    },

    /**
     * Launch a callback indicating when the element is in and when is out.
     */
    watch: function () {
      const self = this;
      let isIn = false;

      $(window).on('resize scroll', function () {

        if (self.isIn() && isIn === false) {
          self.cb.call(self.$el, 'entered');
          isIn = true;
        }

        if (isIn === true && !self.isIn()) {
          self.cb.call(self.$el, 'leaved');
          isIn = false;
        }
      })
    }
  };

  // jQuery plugin.
  //-----------------------------------------------------------
  $.fn.isInViewport = function (cb, offset) {
    offset || (offset = 0);
    return this.each(function () {
      const $element = $(this);
      const data = $element.data('isInViewport');

      if (!data) {
        $element.data('isInViewport', (new IsInViewport(this, cb, offset)));
      }
    })
  }

}(window.jQuery);