json.events @events.each_with_object({}) { |event, hash|
  hash[event.id] = {
    id: event.id,
    name: event.name,
    description: event.description,
    start_time: event.start_time,
    start_day: event.start_day,
    user_ids: event.user_ids,
    address: event.address,
    groupName: event.group.name
  }
}

json.fetchedEventIds @events.ids