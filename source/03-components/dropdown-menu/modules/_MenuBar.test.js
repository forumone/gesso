// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import MenuBar from './_MenuBar.es6';
import MenubarItem from './_MenubarItem.es6';

function createMenuBarMarkup() {
  const domNode = document.createElement('ul');
  domNode.innerHTML = `
    <li><a href="#">Item 0</a></li>
    <li><a href="#">Item 1</a></li>
  `;
  document.body.appendChild(domNode);
  return domNode;
}

describe('MenuBar', () => {
  it('throws when the domNode is not an Element', () => {
    expect(() => new MenuBar('not-an-element')).toThrow(TypeError);
  });

  it('throws when the domNode has no children', () => {
    const domNode = document.createElement('ul');
    document.body.appendChild(domNode);
    expect(() => new MenuBar(domNode)).toThrow(
      'does not have element children'
    );
  });

  it('throws when a child element is not an A or BUTTON', () => {
    const domNode = document.createElement('ul');
    domNode.innerHTML = '<li><span>Not valid</span></li>';
    document.body.appendChild(domNode);
    expect(() => new MenuBar(domNode)).toThrow(
      'has child elements that are not A or Button elements'
    );
  });

  it('marks itself as a menubar', () => {
    const menuBar = new MenuBar(createMenuBarMarkup());
    expect(menuBar.isMenubar).toBe(true);
  });

  it('creates MenubarItem instances for its children', () => {
    const menuBar = new MenuBar(createMenuBarMarkup());
    menuBar.init();
    expect(menuBar.menuItems).toHaveLength(2);
    menuBar.menuItems.forEach(item => {
      expect(item).toBeInstanceOf(MenubarItem);
    });
  });
});
