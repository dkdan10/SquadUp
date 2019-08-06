
json.event do
    json.extract! @event, :id, :organizer_id, :group_id, :name, :description, :start_day, :start_time, :lat, :lng, :address, :user_ids
end

json.group do 
    json.set! @event.group_id do 
        json.extract! @event.group, :id, :name, :description, :event_ids
    end
end

json.rsvpers do 
    @event.users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :email
        end
    end
    json.set! @event.organizer_id do 
        json.extract! @event.organizer, :id, :username, :email, :location_id
    end
end