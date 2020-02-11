<?php
/*
 * @file
 * Twig filter to use Drupal's getUniqueId function to create unique HTML IDs.
 */

$function = new \Twig_SimpleFilter('unique_id', '\\Drupal\\Component\\Utility\\Html::getUniqueId');
