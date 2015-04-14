(function ($) {

  'use strict';

  // The styling for this mobile menu is located in sass/components/mobile-menu/_mobile-menu.scss.

  Drupal.behaviors.mobileMenu = {
    attach: function (context) {

      // Create mobile menu container, create mobile bar, and clone the main
      // menu in the navigation region.
      var $mobileNav = $('<nav class="mobile-menu" role="navigation"></nav>'),
          $mobileBar = $('<div class="mobile-menu__bar"><a class="mobile-menu__button mobile-menu__button--home" href="/" rel="home"><span class="mobile-menu__icon mobile-menu__icon--home">Home</span></a><button class="mobile-menu__button js-mobile-menu-button mobile-menu__button--menu"><span class="mobile-menu__icon mobile-menu__icon--menu">Menu</span></button></div>'),
          $mobileLinks = $('<div class="mobile-menu__links element-hidden"></div>'),
          $mainMenu = $('.region-navigation', context).find('.nav--main-menu, .block--system-main-menu .nav').not('.contextual-links').first().clone(),
          $isSuperfish = ($mainMenu.hasClass('sf-menu')) ? true : false;

      // Only create mobile menu if there is a main menu.
      if ($mainMenu.length > 0) {

        // Remove menu id, add class, and format subnav menus.
        $mainMenu.removeAttr('id').attr('class', 'nav nav--mobile-menu').find('ul').each(function () {
          var $parentLink = $(this).prev('a');

          // Copy parent link to subnav list.
          $parentLink.clone().prependTo(this).wrap('<li class="nav__item"></li>');

          // Change parent link into a button and add classes.
          $parentLink.replaceWith(function () {
            return $('<button class="nav__link nav__link--parent js-mobile-menu-parent" />').append($(this).contents());
          });

          // Remove inline styles from Superfish.
          if ($isSuperfish) {
            $(this).removeAttr('style').addClass('nav--subnav').find('ul, li, a').removeAttr('style');
          }
        });

        // Set classes on superfish items.
        if ($isSuperfish) {
          $mainMenu.find('li').each(function(){
            $(this).attr('class', 'nav__item').find('a').attr('class', 'nav__link');
          });
        }

        // Remove third level menu items.
        $mainMenu.find('ul ul').remove();

        // Insert the cloned menus into the mobile menu container.
        $mainMenu.appendTo($mobileLinks);

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
          $mobileMenuWrapper.toggleClass('element-hidden');

          // Remove focus for mouse clicks after closing the menu.
          $(this).not('.is-active').mouseleave(function () {
            $(this).blur();
          });

          // Take mobile menu links out of tab flow if hidden.
          if ($mobileMenuWrapper.hasClass('element-hidden')) {
            $mobileMenuLinks.attr('tabindex', -1);
          }
          else {
            $mobileMenuLinks.removeAttr('tabindex');
          }

          e.preventDefault();
        });

        // Open/close submenus.
        $('.js-mobile-menu-parent', context).click(function (e) {
          $(this).toggleClass('is-active').next('ul').slideToggle();

          // Remove focus for mouse clicks after closing the subnav.
          $(this).not('.is-active').mouseleave(function () {
            $(this).blur();
          });

          e.preventDefault();
        });

        // Set the height of the menu.
        $mobileMenuWrapper.height($(document).height());
      }
    }
  };

})(jQuery);
