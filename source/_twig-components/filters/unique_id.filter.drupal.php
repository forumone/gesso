<?php

/**
 * @file
 * Twig filter to use Drupal's getUniqueId function to create unique HTML IDs.
 */

// $function is used by GessoExtensionLoader.php, where this file is included.
// @codingStandardsIgnoreLine
$function = new Twig_SimpleFilter('unique_id', '\\Drupal\\Component\\Utility\\Html::getUniqueId');
