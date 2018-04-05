(function ($, Drupal) {

  'use strict';

  // The styling for this mobile menu is located in pattern-lab/source/_patterns/03-components/mobile-menu/_mobile-menu.scss.

  Drupal.behaviors.mobileMenu = {
    attach: function (context) {

      // Create mobile menu container, create mobile bar, and clone the main
      // menu in the navigation region.
      var $mobileNav = $('<nav class="mobile-menu" role="navigation"></nav>'),
          $mobileBar = $('<div class="mobile-menu__bar"><button class="mobile-menu__button js-mobile-menu-button mobile-menu__button--menu"><span class="mobile-menu__icon mobile-menu__icon--menu">Menu</span></button></div>'),
          $mobileLinks = $('<div class="mobile-menu__links hidden"></div>'),
          $mainMenu = $('.l-navigation', context).find('.menu--main').first().clone();

      // Only create mobile menu if there is a main menu.
      if ($mainMenu.length > 0) {

        // Remove menu id, add class, and format subnav menus.
        $mainMenu.removeAttr('id').attr('class', 'menu menu--mobile').find('ul').each(function () {
          var $parentLink = $(this).siblings('a');
          $parentLink.addClass('menu__link--parent').parent('li').addClass('menu__item--parent');
          if ($parentLink.siblings('.menu__subnav-arrow').length < 1) {
            $parentLink.after('<button class="menu__subnav-arrow">Show</button>');
          }

      });

        // Remove third level menu items.
        $mainMenu.find('ul ul').remove();

        // Insert the cloned menus into the mobile menu container.
        $mainMenu.appendTo($mobileLinks);

        // insert search button and clone/append search bar, if it exists.
        if (!($('.mobile-menu .mobile-menu__search').length > 0)) {
          if ($('.block--search').length > 0) {
            $('.block--search').clone().addClass('mobile-menu__search').appendTo($mobileNav);
            $mobileBar.append('<button class="mobile-menu__button js-mobile-search-button mobile-menu__button--search"><span class="mobile-menu__icon mobile-menu__icon--search">Search</span></button>');
          }
        }

        // Insert the top bar into mobile menu container.
        $mobileBar.prependTo($mobileNav);

        // Insert the mobile links into mobile menu container.
        $mobileLinks.appendTo($mobileNav);

        // Add mobile menu to the page.
        $('.skiplinks', context).after($mobileNav);

        var $mobileMenuWrapper = $('.mobile-menu__links', context),
            $mobileMenuLinks = $mobileMenuWrapper.find('a');

        // Initially take mobile menu links out of tab flow.
        $mobileMenuLinks.attr('tabindex', -1);

        // Open/close mobile menu when menu button is clicked.
        $('.js-mobile-menu-button', context).click(function (e) {
          $(this).toggleClass('is-active');
          $mobileMenuWrapper.toggleClass('hidden');

          // Close search bar if open.
          if ($('.js-mobile-search-button').hasClass('is-active')) {
            $('.js-mobile-search-button').removeClass('is-active');
            $('.mobile-menu .mobile-menu__search').hide();
          }

          // Remove focus for mouse clicks after closing the menu.
          $(this).not('.is-active').mouseleave(function () {
            $(this).blur();
          });

          // Take mobile menu links out of tab flow if hidden.
          if ($mobileMenuWrapper.hasClass('hidden')) {
            $mobileMenuLinks.attr('tabindex', -1);
          }
          else {
            $mobileMenuLinks.removeAttr('tabindex');
          }

          e.preventDefault();
        });

        // Open/close submenus.
        $('.menu__subnav-arrow', context).click(function (e) {
          $(this).toggleClass('is-active').parent().toggleClass('is-open');
          $(this).siblings('.menu__subnav').slideToggle();

          // Remove focus for mouse clicks after closing the menu.
          $(this).not('.is-active').mouseleave(function () {
            $(this).blur();
          });

          e.preventDefault();
        });

        // Open/close search bar.
        $('.js-mobile-search-button', context).click(function (e) {
          $(this).toggleClass('is-active');

          // Close menu if open.
          if ($('.js-mobile-menu-button').hasClass('is-active')) {
            $('.js-mobile-menu-button').removeClass('is-active');
            $mobileMenuWrapper.addClass('hidden');
            $mobileMenuLinks.attr('tabindex', -1);
          }

          // Remove focus for mouse clicks after closing the menu.
          $(this).not('.is-active').mouseleave(function () {
            $(this).blur();
          });

          // Slide search bar.
          $('.mobile-menu .mobile-menu__search').slideToggle(200);

          e.preventDefault();
        });

        // Set the height of the menu.
        $mobileMenuWrapper.height($(document).height());
      }
    }
  };
})(jQuery, Drupal);
