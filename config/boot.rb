ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.

# Rails 6.1 + Ruby 3.x: activesupport's logger_thread_safe_level.rb references
# the Logger constant at module-eval time without requiring it. Ruby 3 no
# longer auto-loads logger, and rails/commands.rb pulls activesupport before
# Bundler.require has a chance to load any gem groups. Require it here, the
# earliest hook in the boot chain we own.
require 'logger'

require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
