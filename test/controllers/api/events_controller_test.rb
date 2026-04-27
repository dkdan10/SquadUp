require 'test_helper'

class Api::EventsControllerTest < ActionDispatch::IntegrationTest
  test "search treats query as data" do
    owner = create_user!
    group = create_group!(owner: owner)
    create_event!(organizer: owner, group: group, name: "Needle Event")
    create_event!(organizer: owner, group: group, name: "Hidden Event")

    get "/api/events", params: { search: "needle%' OR 1=1 --" }

    assert_response :success
    assert_empty json_response["events"]
  end

  test "current user group event search treats query as data" do
    owner = create_user!
    group = create_group!(owner: owner)
    group.members << owner
    create_event!(organizer: owner, group: group, name: "Needle Event")
    login_as(owner)

    get "/api/current_user/groups/events", params: { search: "needle%' OR 1=1 --" }

    assert_response :success
    assert_empty json_response["events"]
  end

  test "create requires login" do
    owner = create_user!
    group = create_group!(owner: owner)

    post "/api/events", params: { event: valid_event_params(group) }

    assert_response :unauthorized
  end

  test "non owner cannot create event for a group" do
    owner = create_user!
    non_owner = create_user!(location: owner.location)
    group = create_group!(owner: owner)
    login_as(non_owner)

    assert_no_difference "Event.count" do
      post "/api/events", params: { event: valid_event_params(group) }
    end

    assert_response :not_found
  end

  test "group owner can create event" do
    owner = create_user!
    group = create_group!(owner: owner)
    login_as(owner)

    assert_difference "Event.count", 1 do
      post "/api/events", params: { event: valid_event_params(group) }
    end

    assert_response :success
  end

  test "organizer cannot update event unless they still own its group" do
    owner = create_user!
    organizer = create_user!(location: owner.location)
    group = create_group!(owner: owner)
    event = create_event!(organizer: organizer, group: group)
    login_as(organizer)

    patch "/api/events/#{event.id}", params: {
      event: valid_event_params(group).merge(name: "Updated Event", id: event.id)
    }

    assert_response :not_found
  end
end
