
json.group do 
    json.extract! @group, :id, :name, :description
    json.location @group.location.name
    json.locationId @group.location_id
    json.owner @group.owner.username
    json.ownerId @group.owner_id
    json.memberIds @group.group_memberships.pluck(:member_id)
end

json.members do 
    @group.members.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :email, :location_id
        end
    end
end