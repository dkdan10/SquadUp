json.extract! user, :id, :username, :email, :location_id, :group_ids
json.joined_group_event_ids user.joined_group_events.pluck(:id)
