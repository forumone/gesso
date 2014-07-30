<?php
/**
 * @file
 * Theme implementation to present all user profile data.
 *
 *
 * Use render($user_profile) to print all profile items, or print a subset
 * such as render($user_profile['user_picture']). Always call
 * render($user_profile) at the end in order to print all remaining items. If
 * the item is a category, it will contain all its profile items. By default,
 * $user_profile['member_for'] is provided, which contains data on the user's
 * history. Other data can be included by modules. $user_profile['user_picture']
 * is available for showing the account picture.
 */
?>
<article<?php print $attributes; ?>>
  <?php print render($user_profile); ?>
</article>
