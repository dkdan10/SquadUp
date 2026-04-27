json.groups @groups.each_with_object({}) { |group, hash|
  hash[group.id] = {
    id: group.id,
    name: group.name,
    description: group.description,
    event_ids: group.event_ids,
    location: group.location.name,
    memberIds: group.group_memberships.pluck(:member_id)
  }
}

json.fetchedGroupIds @groups.ids