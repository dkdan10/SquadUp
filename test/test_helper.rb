ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Add more helper methods to be used by all tests here...
end

module ApiTestHelpers
  PASSWORD = "password".freeze

  def json_response
    JSON.parse(response.body)
  end

  def create_location!(name: nil)
    Location.create!(
      name: name || "Test City #{SecureRandom.hex(4)}",
      lat: 40.0,
      lng: -73.0
    )
  end

  def create_user!(location: nil, username: nil, email: nil)
    location ||= create_location!
    User.create!(
      username: username || "user_#{SecureRandom.hex(4)}",
      email: email || "user_#{SecureRandom.hex(4)}@example.com",
      password: PASSWORD,
      location_id: location.id
    )
  end

  def create_group!(owner:, location: nil, name: nil)
    location ||= owner.location
    Group.create!(
      owner_id: owner.id,
      location_id: location.id,
      name: name || "Group #{SecureRandom.hex(4)}",
      description: "A long enough group description for validation.",
      private: false
    )
  end

  def create_event!(organizer:, group:, name: nil)
    Event.create!(
      organizer_id: organizer.id,
      group_id: group.id,
      name: name || "Event #{SecureRandom.hex(4)}",
      description: "A long enough event description for validation.",
      start_day: "2026/05/01",
      start_time: "10:00",
      address: "22 W 38th St, New York, NY 10018, USA",
      lat: 40.7513597,
      lng: -73.9839223
    )
  end

  def login_as(user)
    post "/api/session", params: {
      user: {
        email: user.email,
        password: PASSWORD
      }
    }
    assert_response :success
  end

  def valid_event_params(group)
    {
      name: "Hosted Event",
      description: "A long enough event description for validation.",
      start_day: "2026/05/01",
      start_time: "10:00",
      group_id: group.id,
      address: "22 W 38th St, New York, NY 10018, USA",
      lat: 40.7513597,
      lng: -73.9839223
    }
  end
end

class ActionDispatch::IntegrationTest
  include ApiTestHelpers
end
