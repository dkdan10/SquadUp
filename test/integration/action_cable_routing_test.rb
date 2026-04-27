require 'test_helper'

class ActionCableRoutingTest < ActionDispatch::IntegrationTest
  test "ActionCable is mounted at /cable, not /api/cable" do
    cable_route = Rails.application.routes.routes.find do |route|
      route.app.app == ActionCable.server
    end

    assert cable_route, "expected ActionCable to be mounted in routes.rb"
    assert_equal "/cable", cable_route.path.spec.to_s,
                 "default Rails App.cable consumer connects to /cable; the mount must match"
  end
end
