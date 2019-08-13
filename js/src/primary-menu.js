(function(Drupal) {
  'use strict';

  // The styling for this mobile menu is located in pattern-lab/source/_patterns/03-components/mobile-menu/_mobile-menu.scss.

  Drupal.behaviors.primaryNav = {
    attach: function(context) {
      const KEYCODE = {
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        SPACE: 32,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
      };

      const MenuItem = function(domNode, menuObj) {
        this.domNode = domNode;
        this.menu = menuObj;
        this.popupMenu = false;
        this.isMenubarItem = false;
      };

      MenuItem.prototype.init = function() {
        this.domNode.tabIndex = -1;

        this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
        this.domNode.addEventListener('click', this.handleClick.bind(this));
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
        this.domNode.addEventListener(
          'mouseover',
          this.handleMouseover.bind(this),
        );
        this.domNode.addEventListener(
          'mouseout',
          this.handleMouseout.bind(this),
        );

        // Initialize flyout menu

        var nextElement = this.domNode.nextElementSibling;

        if (nextElement && nextElement.tagName === 'UL') {
          this.popupMenu = new PopupMenu(nextElement, this);
          this.popupMenu.init();
        }
      };

      MenuItem.prototype.isExpanded = function() {
        return this.domNode.getAttribute('aria-expanded') === 'true';
      };

      /* EVENT HANDLERS */

      MenuItem.prototype.handleKeydown = function(event) {
        var tgt = event.currentTarget,
          char = event.key,
          flag = false,
          clickEvent;

        function isPrintableCharacter(str) {
          return str.length === 1 && str.match(/\S/);
        }

        switch (event.keyCode) {
          case KEYCODE.SPACE:
          case KEYCODE.RETURN:
            if (this.popupMenu) {
              this.popupMenu.open();
              this.popupMenu.setFocusToFirstItem();
            } else {
              // Create simulated mouse event to mimic the behavior of ATs
              // and let the event handler handleClick do the housekeeping.
              try {
                clickEvent = new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true,
                });
              } catch (err) {
                if (document.createEvent) {
                  // DOM Level 3 for IE 9+
                  clickEvent = document.createEvent('MouseEvents');
                  clickEvent.initEvent('click', true, true);
                }
              }
              tgt.dispatchEvent(clickEvent);
            }

            flag = true;
            break;

          case KEYCODE.UP:
            this.menu.setFocusToPreviousItem(this);
            flag = true;
            break;

          case KEYCODE.DOWN:
            this.menu.setFocusToNextItem(this);
            flag = true;
            break;

          case KEYCODE.LEFT:
            this.menu.setFocusToController('previous', true);
            this.menu.close(true);
            flag = true;
            break;

          case KEYCODE.RIGHT:
            if (this.popupMenu) {
              this.popupMenu.open();
              this.popupMenu.setFocusToFirstItem();
            } else {
              this.menu.setFocusToController('next', true);
              this.menu.close(true);
            }
            flag = true;
            break;

          case KEYCODE.HOME:
          case KEYCODE.PAGEUP:
            this.menu.setFocusToFirstItem();
            flag = true;
            break;

          case KEYCODE.END:
          case KEYCODE.PAGEDOWN:
            this.menu.setFocusToLastItem();
            flag = true;
            break;

          case KEYCODE.ESC:
            this.menu.setFocusToController();
            this.menu.close(true);
            flag = true;
            break;

          case KEYCODE.TAB:
            this.menu.setFocusToController();
            break;

          default:
            if (isPrintableCharacter(char)) {
              this.menu.setFocusByFirstCharacter(this, char);
              flag = true;
            }
            break;
        }

        if (flag) {
          event.stopPropagation();
          event.preventDefault();
        }
      };

      MenuItem.prototype.setExpanded = function(value) {
        if (value) {
          this.domNode.setAttribute('aria-expanded', 'true');
        } else {
          this.domNode.setAttribute('aria-expanded', 'false');
        }
      };

      MenuItem.prototype.handleClick = function(event) {
        this.menu.setFocusToController();
        this.menu.close(true);
      };

      MenuItem.prototype.handleFocus = function(event) {
        this.menu.hasFocus = true;
      };

      MenuItem.prototype.handleBlur = function(event) {
        this.menu.hasFocus = false;
        setTimeout(this.menu.close.bind(this.menu, false), 300);
      };

      MenuItem.prototype.handleMouseover = function(event) {
        this.menu.hasHover = true;
        this.menu.open();
        if (this.popupMenu) {
          this.popupMenu.hasHover = true;
          this.popupMenu.open();
        }
      };

      MenuItem.prototype.handleMouseout = function(event) {
        if (this.popupMenu) {
          this.popupMenu.hasHover = false;
          this.popupMenu.close(true);
        }

        this.menu.hasHover = false;
        setTimeout(this.menu.close.bind(this.menu, false), 300);
      };

      const PopupMenu = function(domNode, controllerObj) {
        this.isMenubar = false;

        this.domNode = domNode;
        this.controller = controllerObj;

        this.menuitems = []; // See PopupMenu init method
        this.firstChars = []; // See PopupMenu init method

        this.firstItem = null; // See PopupMenu init method
        this.lastItem = null; // See PopupMenu init method

        this.hasFocus = false; // See MenuItem handleFocus, handleBlur
        this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
      };

      PopupMenu.prototype.init = function() {
        this.domNode.setAttribute('role', 'menu');

        this.domNode.addEventListener(
          'mouseover',
          this.handleMouseover.bind(this),
        );
        this.domNode.addEventListener(
          'mouseout',
          this.handleMouseout.bind(this),
        );
        // debugger;
        let childElement = this.domNode.firstElementChild;

        while (childElement) {
          let menuElement = childElement.firstElementChild;

          if (menuElement && menuElement.tagName === 'A') {
            let menuItem = new MenuItem(menuElement, this);
            menuItem.init();
            this.menuitems.push(menuItem);
            let textContent = menuElement.textContent.trim();
            this.firstChars.push(textContent.substring(0, 1).toLowerCase());
          }
          childElement = childElement.nextElementSibling;
        }

        let numItems = this.menuitems.length;
        if (numItems > 0) {
          this.firstItem = this.menuitems[0];
          this.lastItem = this.menuitems[numItems - 1];
        }
      };

      PopupMenu.prototype.handleMouseover = function(event) {
        this.hasHover = true;
      };

      PopupMenu.prototype.handleMouseout = function(event) {
        this.hasHover = false;
        setTimeout(this.close.bind(this, false), 1);
      };

      PopupMenu.prototype.setFocusToController = function(command, flag) {
        if (typeof command !== 'string') {
          command = '';
        }

        function setFocusToMenubarItem(controller, close) {
          while (controller) {
            if (controller.isMenubarItem) {
              controller.domNode.focus();
              return controller;
            } else {
              if (close) {
                controller.menu.close(true);
              }
              controller.hasFocus = false;
            }
            controller = controller.menu.controller;
          }
          return false;
        }

        if (command === '') {
          if (this.controller && this.controller.domNode) {
            this.controller.domNode.focus();
          }
          return;
        }

        if (!this.controller.isMenubarItem) {
          this.controller.domNode.focus();
          this.close();

          if (command === 'next') {
            var menubarItem = setFocusToMenubarItem(this.controller, false);
            if (menubarItem) {
              menubarItem.menu.setFocusToNextItem(menubarItem, flag);
            }
          }
        } else {
          if (command === 'previous') {
            this.controller.menu.setFocusToPreviousItem(this.controller, flag);
          } else if (command === 'next') {
            this.controller.menu.setFocusToNextItem(this.controller, flag);
          }
        }
      };

      PopupMenu.prototype.setFocusToFirstItem = function() {
        this.firstItem.domNode.focus();
      };

      PopupMenu.prototype.setFocusToLastItem = function() {
        this.lastItem.domNode.focus();
      };

      PopupMenu.prototype.setFocusToPreviousItem = function(currentItem) {
        var index;

        if (currentItem === this.firstItem) {
          this.lastItem.domNode.focus();
        } else {
          index = this.menuitems.indexOf(currentItem);
          this.menuitems[index - 1].domNode.focus();
        }
      };

      PopupMenu.prototype.setFocusToNextItem = function(currentItem) {
        var index;

        if (currentItem === this.lastItem) {
          this.firstItem.domNode.focus();
        } else {
          index = this.menuitems.indexOf(currentItem);
          this.menuitems[index + 1].domNode.focus();
        }
      };

      PopupMenu.prototype.setFocusByFirstCharacter = function(
        currentItem,
        char,
      ) {
        var start,
          index,
          char = char.toLowerCase();

        // Get start index for search based on position of currentItem
        start = this.menuitems.indexOf(currentItem) + 1;
        if (start === this.menuitems.length) {
          start = 0;
        }

        // Check remaining slots in the menu
        index = this.getIndexFirstChars(start, char);

        // If not found in remaining slots, check from beginning
        if (index === -1) {
          index = this.getIndexFirstChars(0, char);
        }

        // If match was found...
        if (index > -1) {
          this.menuitems[index].domNode.focus();
        }
      };

      PopupMenu.prototype.getIndexFirstChars = function(startIndex, char) {
        for (var i = startIndex; i < this.firstChars.length; i++) {
          if (char === this.firstChars[i]) {
            return i;
          }
        }
        return -1;
      };

      PopupMenu.prototype.open = function() {
        // Get position and bounding rectangle of controller object's DOM node
        var rect = this.controller.domNode.getBoundingClientRect();
        // Set CSS properties
        if (!this.controller.isMenubarItem) {
          this.domNode.parentNode.style.position = 'relative';
          this.domNode.style.display = 'block';
          this.domNode.style.position = 'absolute';
          this.domNode.style.left = rect.width + 'px';
          this.domNode.style.zIndex = 100;
        } else {
          this.domNode.style.display = 'block';
          this.domNode.style.position = 'absolute';
          this.domNode.style.top = rect.height - 1 + 'px';
          this.domNode.style.zIndex = 100;
        }

        this.controller.setExpanded(true);
      };

      // Menu display
      PopupMenu.prototype.close = function(force) {
        var controllerHasHover = this.controller.hasHover;

        var hasFocus = this.hasFocus;

        for (var i = 0; i < this.menuitems.length; i++) {
          var mi = this.menuitems[i];
          if (mi.popupMenu) {
            hasFocus = hasFocus | mi.popupMenu.hasFocus;
          }
        }

        if (!this.controller.isMenubarItem) {
          controllerHasHover = false;
        }

        if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
          this.domNode.style.display = 'none';
          this.domNode.style.zIndex = 0;
          this.controller.setExpanded(false);
        }
      };
      const MenubarItem = function(domNode, menuObj) {
        this.menu = menuObj;
        this.domNode = domNode;
        this.popupMenu = false;
        this.hasFocus = false;
        this.hasHover = false;
        this.isMenubarItem = true;
      };

      MenubarItem.prototype.init = function() {
        this.domNode.tabIndex = -1;
        this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
        this.domNode.addEventListener(
          'mouseover',
          this.handleMouseover.bind(this),
        );
        this.domNode.addEventListener(
          'mouseout',
          this.handleMouseout.bind(this),
        );

        let nextElement = this.domNode.nextElementSibling;

        if (nextElement && nextElement.tagName == 'UL') {
          this.domNode.setAttribute('aria-haspopup', 'true');
          this.popupMenu = new PopupMenu(nextElement, this);
          this.popupMenu.init();
        }
      };

      MenubarItem.prototype.handleKeydown = function(event) {
        var tgt = event.currentTarget,
          char = event.key,
          flag = false,
          clickEvent;

        function isPrintableCharacter(str) {
          return str.length === 1 && str.match(/\S/);
        }

        switch (event.keyCode) {
          case KEYCODE.SPACE:
          case KEYCODE.RETURN:
          case KEYCODE.DOWN:
            if (this.popupMenu) {
              this.popupMenu.open();
              this.popupMenu.setFocusToFirstItem();
              flag = true;
            }
            break;

          case KEYCODE.LEFT:
            this.menu.setFocusToPreviousItem(this);
            flag = true;
            break;

          case KEYCODE.RIGHT:
            this.menu.setFocusToNextItem(this);
            flag = true;
            break;

          case KEYCODE.UP:
            if (this.popupMenu) {
              this.popupMenu.open();
              this.popupMenu.setFocusToLastItem();
              flag = true;
            }
            break;

          case KEYCODE.HOME:
          case KEYCODE.PAGEUP:
            this.menu.setFocusToFirstItem();
            flag = true;
            break;

          case KEYCODE.END:
          case KEYCODE.PAGEDOWN:
            this.menu.setFocusToLastItem();
            flag = true;
            break;

          case KEYCODE.TAB:
            if (this.popupMenu) {
              this.popupMenu.close(true);
            }
            break;

          case KEYCODE.ESC:
            if (this.popupMenu) {
              this.popupMenu.close(true);
            }
            break;

          default:
            if (isPrintableCharacter(char)) {
              this.menu.setFocusByFirstCharacter(this, char);
              flag = true;
            }
            break;
        }

        if (flag) {
          event.stopPropagation();
          event.preventDefault();
        }
      };

      MenubarItem.prototype.setExpanded = function(value) {
        if (value) {
          this.domNode.setAttribute('aria-expanded', 'true');
        } else {
          this.domNode.setAttribute('aria-expanded', 'false');
        }
      };

      MenubarItem.prototype.handleFocus = function(event) {
        this.menu.hasFocus = true;
      };

      MenubarItem.prototype.handleBlur = function(event) {
        this.menu.hasFocus = false;
      };

      MenubarItem.prototype.handleMouseover = function(event) {
        this.hasHover = true;
        if (this.popupMenu) {
          this.popupMenu.open();
        }
      };

      MenubarItem.prototype.handleMouseout = function(event) {
        this.hasHover = false;
        if (this.popupMenu) {
          setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
        }
      };

      const MenuBar = function(domNode) {
        let elementChildren,
          msgPrefix = 'Menubar constructor argument menuBarNode';

        if (!domNode instanceof Element) {
          throw new TypeError(msgPrefix + 'is not a Dom Element');
        }

        if (domNode.childElementCount == 0) {
          throw new Error(`${msxg} has not element children`);
        }

        let e = domNode.firstElementChild;

        while (e) {
          let menuBarItem = e.firstElementChild;
          if (e && menuBarItem && menuBarItem.tagName != 'A') {
            throw new Error(
              `${msgPrefix} has child elements are not A elements`,
            );
          }
          e = e.nextElementSibling;
        }

        this.isMenuBar = true;
        this.domNode = domNode;
        this.menubarItems = [];
        this.firstChars = [];
        this.firstItem = null;
        this.lastItem = null;
        this.hasFocus = false;
        this.hasHover = false;
      };

      MenuBar.prototype.init = function() {
        this.domNode.setAttribute('role', 'menubar');

        let elem = this.domNode.firstElementChild;

        while (elem) {
          elem.setAttribute('role', 'none');
          let menuElement = elem.firstElementChild;

          if (elem && menuElement && menuElement.tagName === 'A') {
            let menubarItem = new MenubarItem(menuElement, this);
            menubarItem.init();
            this.menubarItems.push(menubarItem);

            let textContent = menuElement.textContent.trim();
            this.firstChars.push(textContent.substring(0, 1).toLowerCase());
          }

          elem = elem.nextElementSibling;
        }

        let numItems = this.menubarItems.length;

        if (numItems > 0) {
          this.firstItem = this.menubarItems[0];
          this.lastItem = this.menubarItems[numItems - 1];
        }
        this.firstItem.domNode.tabIndex = 0;
      };

      // Focus Management
      MenuBar.prototype.setFocusToItem = function(newItem) {
        var flag = false;

        for (let i = 0; i < this.menubarItems.length; i++) {
          let mbi = this.menubarItems[i];

          if (mbi.domNode.tabIndex == 0) {
            flag = mbi.domNode.getAttribute('aria-expanded') === 'true';
          }

          mbi.domNode.tabIndex = -1;
          if (mbi.popupMenu) {
            mbi.popupMenu.close();
          }
        }

        newItem.domNode.focus();
        newItem.domNode.tabIndex = 0;

        if (flag && newItem.popupMenu) {
          newItem.popupMenu.open();
        }
      };

      MenuBar.prototype.setFocusToFirstItem = function(flag) {
        this.setFocusToItem(this.firstItem);
      };

      MenuBar.prototype.setFocusToLastItem = function(flag) {
        this.setFocusToItem(this.lastItem);
      };

      MenuBar.prototype.setFocusToPreviousItem = function(currentItem) {
        let newItem = false;

        if (currentItem === this.firstItem) {
          newItem == this.lastItem;
        } else {
          let index = this.menubarItems.indexOf(currentItem);
          newItem = this.menubarItems[index - 1];
        }

        if (newItem) {
          this.setFocusToItem(newItem);
        }
      };

      MenuBar.prototype.setFocusToNextItem = function(currentItem) {
        let newItem = false;

        if (currentItem === this.lastItem) {
          newItem == this.firstItem;
        } else {
          let index = this.menubarItems.indexOf(currentItem);
          newItem = this.menubarItems[index + 1];
        }

        if (newItem) {
          this.setFocusToItem(newItem);
        }
      };

      MenuBar.prototype.setFocusByFirstCharacter = function(currentItem, char) {
        let currChar = char.toLowerCase();

        let start = this.menuBarItems.IndexOf(currentItem) + 1;
        if (start == this.menuBarItems.length) {
          start = 0;
        }

        let index = this.getIndexFirstChars(start, currChar);

        if (index === -1) {
          index = this.getIndexFirstChars(0, currChar);
        }

        if (index > -1) {
          this.setFocusToItem(this.menubarItems[index]);
        }
      };

      MenuBar.prototype.getIndexFirstChars = function(startIndex, char) {
        for (let i = startIndex; 1 < this.firstChars.length; i++) {
          if (char === this.firstChars[i]) {
            return i;
          }
        }
        return -1;
      };

      const myMenu = new MenuBar(
        document.querySelector('#primary-menu .menu--main'),
      );

      myMenu.init();
    },
  };
})(Drupal);
