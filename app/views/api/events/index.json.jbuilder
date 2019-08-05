@events.each do |event|
    json.set! event.id do
        json.extract! event, :id, :name, :description
    end
end