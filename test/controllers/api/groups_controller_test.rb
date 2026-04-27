require 'test_helper'

class Api::GroupsControllerTest < ActionDispatch::IntegrationTest
  test "search treats query as data" do
    owner = create_user!
    create_group!(owner: owner, name: "Needle Group")
    create_group!(owner: owner, name: "Hidden Group")

    get "/api/groups", params: { search: "needle%' OR 1=1 --" }

    assert_response :success
    assert_empty json_response["groups"]
  end

  test "create requires login" do
    owner = create_user!

    post "/api/groups", params: {
      group: {
        name: "New Group",
        description: "A long enough group description for validation.",
        location_id: owner.location_id,
        private: false
      }
    }

    assert_response :unauthorized
  end
end
