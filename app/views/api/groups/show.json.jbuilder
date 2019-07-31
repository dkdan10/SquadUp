json.extract! @group, :id, :name, :description
json.location @group.location.name
json.owner @group.owner.username