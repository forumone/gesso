---
el: .section
title: Section
---
_Layout for Section_.

### Variables:
* has_wrapper: [boolean] True/False whether to add a main wrapping element.
* element: [string] HTML element to use for main wrapper.
* attributes: [array] HTML attributes for the containing element.
  * class: [string] any classes added by user or system.
* has_constrain: [boolean] True/False whether to add a constraint to block.
* constrain_classes: [string] Constrain classes used to control layout.
* has_label: [boolean] True/False whether block label should be displayed.
* label_element: [string] HTML element to use for block label.
* label: [string] The configured label of the block if visible.
* title_attributes: [array] HTML attributes for the label element.
  * class: [string] any classed added by user or system.
* title_prefix: [array] Additional output populated by modules, intended to be displayed in front of the main title tag that appears in the template.
* title_suffix: [array] Additional output populated by modules, intended to be displayed after the main title tag that appears in the template.
* has_content_wrapper: [boolean] True/False whether a wrapping element should be added around block content.
* content_element: [string] HTML element to use for block content.
* content_attributes: [array] HTML attributes for the content element.
  * class: [string] any classed added by user or system.
* content:  The content of this block.
