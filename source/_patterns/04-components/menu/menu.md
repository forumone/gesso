---
el: .menu
title: Menu
---
_Component for Menu_

## Variables
* menu_name: [string] Identifies the type of menu.
* items: [array] The menu items. Each item is an object containing:
  * title: [string] Title of the menu item.
  * url: [string] URL of the menu item.
  * original_link: [array] Options and HTML attributes for the menu link item.
  * in_active_trail: [boolean] Whether menu item is in the active path.

### Usage
The menu components folder contains several variants including _Account menu_,
_Footer menu_, _Main menu_ and _Menu with subnav_.  Each variant is derived from
the menu component and uses specific data within their respective _YML_ files to
replicate the menu items.

The Menu with Subnav uses the _item.below_ variable to create a submenu with a
menu item.
