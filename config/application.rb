require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SquadUp
  class Application < Rails::Application
    # Initialize configuration defaults for Rails 6.1.
    config.load_defaults 6.1

    # Use the classic autoloader on first 6.1 boot rather than Zeitwerk.
    # File naming in this 2019 capstone hasn't been audited for Zeitwerk's
    # strict expectations; switching can be a follow-up branch.
    config.autoloader = :classic

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
