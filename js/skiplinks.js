(function ($) {

  // Fixes skiplink behavior for Opera and Webkit browsers.
  Drupal.behaviors.skiplinks = {
    attach: function (context) {
      var $context = $(context),
          $skiplink = $context.find('.skiplinks__link'),
          target = $skiplink.attr('href');

      // Set tabindex on the skiplink target so all browsers know they are
      // focusable and so Webkit browsers will focus() them.
      $(target).attr('tabindex', -1);

      // Set focus to skiplink target.
      $skiplink.click(function () {
        var clickAnchor = '#' + this.href.split('#')[1];
        $(clickAnchor).focus();
      });
    }
  };

})(jQuery);
