---
el: .pager
title: Pager
---

__Variables:__
* modifier_classes: [string] Classes to modify the default component styling.
* heading: [string] Accessible heading of the pager.
* items: [array] Pager items.
  * pages: [array] Pager pages. Each item is an object containing:
    * href: [string] Page item href.
    * attributes: [array] Page item attributes.
  * first: [array] First pager item.
    * href: [string] First item href.
    * attributes: [array] First item attributes.
  * previous: [array] Previous pager item.
    * href: [string] Previous item href.
    * attributes: [array] Previous item attributes.
  * next: [array] Next pager item.
    * href: [string] Next item href.
    * attributes: [array] Next item attributes.
  * last: [array] Last pager item.
    * href: [string] Last item href.
    * attributes: [array] Last item attributes.
  * ellipses: [array] Pager ellipses.
    * previous: [boolean] Whether to show the previous ellipsis.
    * next: [boolean] Whether to show the next ellipsis.
