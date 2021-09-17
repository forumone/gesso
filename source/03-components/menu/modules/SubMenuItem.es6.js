import KEYCODE from '../../../00-config/_KEYCODE.es6';
import MenuItem from './MenuItem.es6';

class SubMenuItem extends MenuItem {
  init() {
    super.init();
    this.domNode.addEventListener('click', this.handleClick.bind(this));
  }

  handleKeydown(event) {
    const { currentTarget, key } = event;
    let flag = false;
    let clickEvent;

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
          currentTarget.dispatchEvent(clickEvent);
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
        if (this.isPrintableCharacter(key)) {
          this.menu.setFocusByFirstCharacter(this, key);
          flag = true;
        }
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick() {
    this.menu.setFocusToController();
    this.menu.close(true);
  }

  handleBlur() {
    super.handleBlur();
    setTimeout(this.menu.close.bind(this.menu, false), 300);
  }

  handleMouseover() {
    this.menu.setHover(true);
    this.menu.open();
    super.handleMouseover();
  }

  handleMouseout() {
    super.handleMouseout();
    this.menu.setHover(false);
    setTimeout(this.menu.close.bind(this.menu, false), 300);
  }
}

export default SubMenuItem;
