require 'test_helper'

class Api::ChannelsControllerTest < ActionDispatch::IntegrationTest
  test "show requires login" do
    channel = Channel.create!

    get "/api/channels/#{channel.id}"

    assert_response :unauthorized
  end

  test "show is scoped to current user channels" do
    member = create_user!
    other_member = create_user!(location: member.location)
    stranger = create_user!(location: member.location)
    channel = Channel.create!
    channel.members << member
    channel.members << other_member
    login_as(stranger)

    get "/api/channels/#{channel.id}"

    assert_response :not_found
  end

  test "index only returns current user's channel members without emails" do
    member = create_user!
    other_member = create_user!(location: member.location)
    unrelated = create_user!(location: member.location)
    channel = Channel.create!
    channel.members << member
    channel.members << other_member
    login_as(member)

    get "/api/channels"

    assert_response :success
    members = json_response["members"]
    assert members.key?(member.id.to_s)
    assert members.key?(other_member.id.to_s)
    assert_not members.key?(unrelated.id.to_s)
    assert_not members[other_member.id.to_s].key?("email")
  end
end
