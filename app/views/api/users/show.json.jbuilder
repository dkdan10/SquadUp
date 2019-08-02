json.extract! @user, :id, :username, :email, :location_id
json.group_ids @user.group_memberships.pluck(:group_id)