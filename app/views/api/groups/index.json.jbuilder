@groups.each do |group|
    json.set! group.id do
        json.extract! group, :id, :name, :description
        json.location group.location.name
    end
end