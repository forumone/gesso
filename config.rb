#
# This file is only needed for Compass/Sass integration. If you are not using
# Compass, you may safely ignore or delete this file.
#

# Change this to :production when ready to deploy the CSS to the live server.
environment = :development

# Location of the theme's resources.
css_dir = "css"
fonts_dir = "css/fonts"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"

# Require any additional compass plugins installed on your system.
require 'compass'
require 'breakpoint'
require 'singularitygs'
require 'sass-globbing'

# Disable cache busting on image assets.
asset_cache_buster :none

# Set default file encoding.
Encoding.default_external = "UTF-8"

#
# You probably don't need to edit anything below this.
#

# You can select your preferred output style here (can be overridden via the
# command line):
output_style = (environment == :development) ? :expanded : :compressed

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server root.
relative_assets = true

# Show debugging comments during development.
line_comments = (environment == :development) ? true : false

# Show debug information / partial location for FireSass and similar tools.
# Uncomment to enable.
#debug = (environment == :development) ? true : false

# Output debugging info in development mode.
sass_options = (environment == :development && debug == true) ? {:debug_info => true} : {}

# Increased decimal precision.
# 33.33333% instead of 33.333%
Sass::Script::Number.precision = 5
