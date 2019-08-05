json.extract! @user, :id, :username, :email, :location_id
json.group_ids @user.group_memberships.pluck(:group_id)
json.joined_group_event_ids @user.joined_group_events.pluck(:id)