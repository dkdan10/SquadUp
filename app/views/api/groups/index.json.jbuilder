@groups.each do |group|
    json.set! group.id do
        json.extract! group, :id, :name, :description, :event_ids
        json.location group.location.name
        json.memberIds group.group_memberships.pluck(:member_id)
    end
end