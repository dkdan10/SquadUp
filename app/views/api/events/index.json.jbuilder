@events.each do |event|
    json.set! event.id do
        json.extract! event, :id, :name, :description, :start_time, :start_day
        json.groupName event.group.name
    end
end