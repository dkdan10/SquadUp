
json.channel do
    json.extract! @channel, :id, :member_ids
end

json.members do
    @channel.members.each do |member|
        json.set! member.id do
            json.extract! member, :id, :username, :email, :location_id
        end
    end
end