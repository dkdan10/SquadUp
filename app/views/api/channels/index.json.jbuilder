json.channels do
    @channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :member_ids
        end
    end
end
json.members do
    @channels.each do |channel|
        channel.members.each do |member|
            json.set! member.id do
                json.extract! member, :id, :username, :email, :location_id
            end
        end
    end
end