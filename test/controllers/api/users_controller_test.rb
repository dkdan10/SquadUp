require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test "index requires login" do
    get "/api/users"

    assert_response :unauthorized
  end

  test "index omits user emails" do
    user = create_user!
    login_as(user)

    get "/api/users"

    assert_response :success
    assert_not json_response[user.id.to_s].key?("email")
  end
end
