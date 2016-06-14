<?php
/**
 * @file
 * Navigation-related functions.
 */

/**
 * Returns HTML for a link.
 */
function gesso_link($vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // Modify active class to follow SMACSS naming convention.
  if (isset($vars['options']['attributes']['class'])) {
    if ($only_use_smacss) {
      $vars['options']['attributes']['class'] = preg_replace('/^active$/', 'is-active', $vars['options']['attributes']['class']);
    }
    else {
      $vars['options']['attributes']['class'][] = 'is-active';
    }
  }

  return '<a href="' . check_plain(url($vars['path'], $vars['options'])) . '"' . drupal_attributes($vars['options']['attributes']) . '>' . ($vars['options']['html'] ? $vars['text'] : check_plain($vars['text'])) . '</a>';
}

/**
 * Implements hook_preprocess_links().
 */
function gesso_preprocess_links(&$vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // Add theme hook suggestion based on classes.
  if (isset($vars['attributes']['class'])) {
    if (is_string($vars['attributes']['class'])) {
      $vars['theme_hook_suggestions'][] = 'links__' . strtr($vars['attributes']['class'], '-', '_');
    }
    elseif (is_array($vars['attributes']['class'])) {
      foreach ($vars['attributes']['class'] as $class) {
        $vars['theme_hook_suggestions'][] = 'links__' . strtr($class, '-', '_');
      }
    }
  }

  // Change default classes.
  if (isset($vars['attributes']['class'])) {

    // Make sure link classes are set as an array.
    if (!is_array($vars['attributes']['class'])) {
      $this_class = $vars['attributes']['class'];
      $vars['attributes']['class'] = array();
      $vars['attributes']['class'][] = $this_class;
    }

    // Remove default link class.
    if ($only_use_smacss) {
      $vars['attributes']['class'] = array_values(array_diff($vars['attributes']['class'], array(
        'links',
      )));
    }

    // Add default class.
    $vars['attributes']['class'][] = 'nav';

    // Modify classes to follow SMACSS naming convention.
    $vars['attributes']['class'] = preg_replace('/^inline$/', 'nav--inline', $vars['attributes']['class']);
  }
}

/**
 * Returns HTML for a set of links.
 */
function gesso_links($vars) {
  $links = $vars['links'];
  $attributes = $vars['attributes'];
  $heading = $vars['heading'];
  $only_use_smacss = theme_get_setting('only_use_smacss');
  $show_first_last = theme_get_setting('show_first_last');
  global $language_url;
  $output = '';

  if (count($links) > 0) {
    $output = '';

    // Treat the heading first if it is present to prepend it to the
    // list of links.
    if (!empty($heading)) {
      if (is_string($heading)) {

        // Prepare the array that will be used when the passed heading
        // is a string.
        $heading = array(
          'text' => $heading,

          // Set the default level of the heading.
          'level' => 'h2',
        );
      }
      $output .= '<' . $heading['level'];
      if (!empty($heading['class'])) {
        $output .= drupal_attributes(array('class' => $heading['class']));
      }
      $output .= '>' . check_plain($heading['text']) . '</' . $heading['level'] . '>';
    }

    $output .= '<ul' . drupal_attributes($attributes) . '>';

    $num_links = count($links);
    $i = 1;

    foreach ($links as $key => $link) {
      // Add default core classes if wanted.
      if (!$only_use_smacss) {
        $class = array($key);
      }

      $class[] = 'nav__item';
      $class[] = 'nav__item--' . $key;

      // Make sure link attributes array exists.
      if (!isset($link) || !is_array($link)) {
        $link = array('attributes' => array());
      }

      // Add link classes.
      if (isset($link['attributes']['class'])) {
        if (!is_array($link['attributes']['class'])) {
          $this_class = $link['attributes']['class'];
          $link['attributes']['class'] = array();
          $link['attributes']['class'][] = $this_class;
        }
      }
      else {
        $link['attributes']['class'] = array();
      }
      $link['attributes']['class'][] = 'nav__link';

      // Add first, last, and active classes to the list of links.
      if ($show_first_last && $i == 1) {
        $class[] = 'nav__item--first';

        // Add default core class if wanted.
        if (!$only_use_smacss) {
          $class[] = 'first';
        }
      }
      if ($show_first_last && $i == $num_links) {
        $class[] = 'nav__item--last';

        // Add default core class if wanted.
        if (!$only_use_smacss) {
          $class[] = 'last';
        }
      }
      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))
          && (empty($link['language']) || $link['language']->language == $language_url->language)) {
        $link['attributes']['class'][] = 'is-active';

        // Add default core class if wanted.
        if (!$only_use_smacss) {
          $link['attributes']['class'][] = 'active';
        }
      }

      $output .= '<li' . drupal_attributes(array('class' => $class)) . '>';

      if (isset($link['href'])) {
        // Pass in $link as $options, they share the same keys.
        $output .= l($link['title'], $link['href'], $link);
      }
      elseif (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span>
        // for adding title and class attributes.
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span' . $span_attributes . '>' . $link['title'] . '</span>';
      }

      $i++;
      $output .= "</li>\n";
    }

    $output .= '</ul>';
  }

  return $output;
}

/**
 * Returns HTML for a menu tree.
 */
function gesso_menu_tree($vars) {
  if (theme_get_setting('only_use_smacss')) {
    return '<ul class="nav">' . $vars['tree'] . '</ul>';
  }
  else {
    return '<ul class="nav menu">' . $vars['tree'] . '</ul>';
  }
}

/**
 * Returns HTML for a menu block menu tree.
 */
function gesso_menu_tree__menu_block($vars) {
  // Don't ouput <ul> since it's generated via menu_block_wrapper.
  return $vars['tree'];
}

/**
 * Implements hook_preprocess_menu_link().
 */
function gesso_preprocess_menu_link(&$vars) {
  $element = $vars['element'];
  $only_use_smacss = theme_get_setting('only_use_smacss');
  $show_first_last = theme_get_setting('show_first_last');
  $show_collapsed_expanded = theme_get_setting('show_collapsed_expanded');
  $menu = '';
  $mlid = '';

  if (isset($element['#original_link'])) {
    $menu = $element['#original_link']['menu_name'];
    $mlid = $element['#original_link']['mlid'];
  }

  // Make sure item_classes is an array.
  if (isset($vars['element']['#attributes']['class'])) {
    if (!is_array($vars['element']['#attributes']['class'])) {
      $this_class = $vars['element']['#attributes']['class'];
      $vars['element']['#attributes']['class'] = array();
      $vars['element']['#attributes']['class'][] = $this_class;
    }
  }
  else {
    $vars['element']['#attributes']['class'] = array();
  }
  $item_classes = &$vars['element']['#attributes']['class'];

  // Make sure link_classes is an array.
  if (isset($vars['element']['#localized_options']['attributes']['class'])) {
    if (!is_array($vars['element']['#localized_options']['attributes']['class'])) {
      $this_class = $vars['element']['#localized_options']['attributes']['class'];
      $vars['element']['#localized_options']['attributes']['class'] = array();
      $vars['element']['#localized_options']['attributes']['class'][] = $this_class;
    }
  }
  else {
    $vars['element']['#localized_options']['attributes']['class'] = array();
  }
  $link_classes = &$vars['element']['#localized_options']['attributes']['class'];

  // Remove unecessary list item classes.
  if ($only_use_smacss) {
    $remove = array('leaf', 'menu-mlid-' . $mlid);

    if (!$show_collapsed_expanded) {
      $remove[] = 'collapsed';
      $remove[] = 'expanded';
    }

    if (!$show_first_last) {
      $remove[] = 'first';
      $remove[] = 'last';
    }

    $item_classes = array_values(array_diff($item_classes, $remove));
  }

  // Update list item classes.
  if (empty($item_classes)) {
    $item_classes[] = 'nav__item';
  }
  else {
    if (!in_array('nav__item', $item_classes)) {
      array_unshift($item_classes, 'nav__item');
    }

    if ($only_use_smacss) {
      $item_classes = preg_replace('/^active-trail$/', 'is-active-trail', $item_classes);
    }
    elseif (in_array('active-trail', $item_classes)) {
      $item_classes[] = 'is-active-trail';
    }

    if ($show_collapsed_expanded) {
      if ($only_use_smacss) {
        $item_classes = preg_replace('/^collapsed$/', 'is-collapsed', $item_classes);
        $item_classes = preg_replace('/^expanded$/', 'is-expanded', $item_classes);
      }
      else {
        if (in_array('collapsed', $item_classes)) {
          $item_classes[] = 'is-collapsed';
        }

        if (in_array('expanded', $item_classes)) {
          $item_classes[] = 'is-expanded';
        }
      }
    }

    if ($show_first_last) {
      if ($only_use_smacss) {
        $item_classes = preg_replace('/^first$/', 'nav__item--first', $item_classes);
        $item_classes = preg_replace('/^last$/', 'nav__item--last', $item_classes);
      }
      else {
        if (in_array('first', $item_classes)) {
          $item_classes[] = 'nav__item--first';
        }

        if (in_array('last', $item_classes)) {
          $item_classes[] = 'nav__item--last';
        }
      }
    }
  }

  // Update link classes.
  if (empty($link_classes)) {
    $link_classes[] = 'nav__link';
  }
  else {
    if (!in_array('nav__link', $link_classes)) {
      array_unshift($link_classes, 'nav__link');
    }

    if ($only_use_smacss) {
      $link_classes = preg_replace('/^active-trail$/', 'is-active-trail', $link_classes);
    }
    elseif (in_array('active-trail', $link_classes)) {
      $link_classes[] = 'is-active-trail';
    }
  }

  // Uncomment if you want to add mlid classes.
  // $item_classes[] = 'nav__item--mlid-' . $mlid;
  // $link_classes[] = 'nav__link--mlid-' . $mlid;
}

/**
 * Returns HTML for a menu link and submenu.
 */
function gesso_menu_link($vars) {
  $element = $vars['element'];
  $sub_menu = '';
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // Modify active class to follow SMACSS naming convention.
  if (isset($element['#attributes']['class'])) {
    if ($only_use_smacss) {
      $element['#attributes']['class'] = preg_replace('/^active$/', 'is-active', $element['#attributes']['class']);
    }
    else {
      if (in_array('active', $element['#attributes']['class'])) {
        $element['#attributes']['class'][] = 'is-active';
      }
    }
  }

  // Add has-children class.
  if ($element['#original_link']['has_children']) {
    $element['#attributes']['class'][] = 'has-children';
  }

  if ($element['#below']) {
    // Add has-subnav class.
    $element['#attributes']['class'][] = 'has-subnav';

    // Add subnav class.
    unset($element['#below']['#theme_wrappers']);
    $sub_menu = '<ul class="nav nav--subnav">' . drupal_render($element['#below']) . '</ul>';
  }

  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Returns HTML for primary and secondary local tasks.
 */
function gesso_menu_local_tasks($vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');
  $output = '';

  if (!empty($vars['primary'])) {
    $vars['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tasks') . '</h2>';

    if ($only_use_smacss) {
      $vars['primary']['#prefix'] .= '<ul class="nav nav--primary-local-tasks">';
    }
    else {
      $vars['primary']['#prefix'] .= '<ul class="nav nav--primary-local-tasks tabs primary">';
    }

    $vars['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($vars['primary']);
  }

  if (!empty($vars['secondary'])) {
    $vars['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tasks') . '</h2>';

    if ($only_use_smacss) {
      $vars['secondary']['#prefix'] .= '<ul class="nav nav--secondary-local-tasks">';
    }
    else {
      $vars['secondary']['#prefix'] .= '<ul class="nav nav--secondary-local-tasks tabs secondary">';
    }

    $vars['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($vars['secondary']);
  }

  return $output;
}

/**
 * Returns HTML for a single local task link.
 */
function gesso_menu_local_task($vars) {
  $link = $vars['element']['#link'];
  $link_text = $link['title'];
  $link_classes = &$link['localized_options']['attributes']['class'];

  if (!empty($vars['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = '<span class="element-invisible">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));
  }

  // Update link classes.
  if (empty($link_classes)) {
    $link_classes[] = 'nav__link';
  }
  else {
    array_unshift($link_classes, 'nav__link');

    if (theme_get_setting('only_use_smacss')) {
      $link_classes = preg_replace('/^active$/', 'is-active', $link_classes);
    }
    elseif (in_array('active', $link_classes)) {
      $link_classes[] = 'is-active';
    }
  }

  return '<li class="nav__item' . (!empty($vars['element']['#active']) ? ' is-active' : '') . '">' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}

/**
 * Implements hook_preprocess_menu_block_wrapper().
 */
function gesso_preprocess_menu_block_wrapper(&$vars) {
  // Replace default classes using the SMACSS naming convention.
  $vars['classes_array'] = array(
    'nav',
    'nav--' . $vars['config']['menu_name'],
    'nav--menu-block-' . $vars['config']['delta'],
    'has-parent-mlid-' . $vars['config']['parent_mlid'],
    'is-level-' . $vars['config']['level'],
    'has-depth-' . $vars['config']['depth'],
  );
}
