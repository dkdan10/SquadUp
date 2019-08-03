
json.group do 
    json.extract! @group, :id, :name, :description
    json.locationId @group.location_id
    json.ownerId @group.owner_id
    json.memberIds @group.group_memberships.pluck(:member_id)
end

json.members do 
    @group.members.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :email, :location_id
        end
    end
    json.set! @group.owner_id do 
        json.extract! @group.owner, :id, :username, :email, :location_id
    end
end

json.location do
    json.extract! @group.location, :id, :name, :lat, :lng
end