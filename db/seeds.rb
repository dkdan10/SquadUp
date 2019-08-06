# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Location.destroy_all
Group.destroy_all
GroupMembership.destroy_all
Event.destroy_all
EventRsvp.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('locations')
ActiveRecord::Base.connection.reset_pk_sequence!('groups')
ActiveRecord::Base.connection.reset_pk_sequence!('group_memberships')
ActiveRecord::Base.connection.reset_pk_sequence!('events')
ActiveRecord::Base.connection.reset_pk_sequence!('event_rsvps')

l1 = Location.create!(name: "New York, NY", lat: 10, lng: 10)
l2 = Location.create!(name: "San Fransico, SF", lat: 30, lng: 20)
l3 = Location.create!(name: "Tokyo, JP", lat: 123, lng: -20)
l4 = Location.create!(name: "Paris, FR", lat: 12, lng: 42)
l5 = Location.create!(name: "Barcelona, SP", lat: 12, lng: 42)

u1 = User.create!(username: "daniel", email: "daniel@keinan.com", password: "password", location_id: l1.id)
u2 = User.create!(username: "henDog", email: "henry@tan.com", password: "password", location_id: l3.id)
u3 = User.create!(username: "spenki", email: "sen@ki.com", password: "password", location_id: l5.id)
u4 = User.create!(username: "georgie!", email: "george@peni.com", password: "password", location_id: l4.id)
u5 = User.create!(username: "Ram", email: "ram@ram.com", password: "password", location_id: l2.id)
u6 = User.create!(username: "Betty", email: "bet@betty.com", password: "password", location_id: l5.id)
demoU = User.create!(username: "DemoUser", email: "demo@user.com", password: "password", location_id: l1.id)

g1 = Group.create!(name:"First Group", description:"This is the first group. It is for people who want to be in the first group. The first group is a great time!", location_id: l1.id, private: false, owner_id: u1.id)
g1.members << u1
g1.members << u2
g2 = Group.create!(name:"Second Group", description:"This is the second group. As the saying goes: First is the worst second is the best! ", location_id: l3.id, private: false, owner_id: u2.id)
g2.members << u2
g3 = Group.create!(name:"Third Group", description:"This is the third group. The third group is for people didn't want to join the first or second group.", location_id: l5.id, private: false, owner_id: u3.id)
g3.members << u3
g4 = Group.create!(name:"Tokyo Basketballers", description:"Lets all Squad up and play basketball together! Any skill level is welcome. Come through with a smile!", location_id: l3.id, private: false, owner_id: u1.id)
g4.members << u4
g5 = Group.create!(name:"Ram's social hour!", description:"This group is for friends of Ram to hang out with Ram. It should be a blast. Stay tuned!", location_id: l1.id, private: false, owner_id: u5.id)
g5.members << u1
g5.members << u2
g5.members << u3
g5.members << u4
g5.members << u5
g5.members << u6
g6 = Group.create!(name:"Betty's Crafts!", description:"Come and do arts and crafts with Betty! We will have a great time. I can't wait to meet new people", location_id: l1.id, private: false, owner_id: u6.id)
g6.members << u1
g6.members << u2
g6.members << u3
g6.members << u4
g6.members << u5
g6.members << u6

demoG = Group.create!(name:"Demo User's Group!", description:"This is a group for the demo user to play around with!", location_id: l2.id, private: false, owner_id: demoU.id)

demoG.members << demoU
demoG.members << u1
demoG.members << u2
demoG.members << u3
demoG.members << u4
demoG.members << u5
demoG.members << u6

demoE = Event.create!(name: "Party at the Academy", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lectus sit amet dui convallis sagittis. Quisque a justo nec est venenatis euismod. Sed fermentum tortor nec lacus vehicula, non accumsan velit ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam condimentum, velit eu suscipit ornare, sem sem sodales mi, id dictum neque erat nec nunc. Vestibulum posuere purus in nulla auctor vestibulum. Aliquam condimentum, lorem et tincidunt efficitur, dolor tellus imperdiet quam, in tempor justo erat in velit. Duis porta ullamcorper diam, sit amet mollis felis laoreet quis. Aenean scelerisque blandit condimentum. Suspendisse quis dui auctor, volutpat eros ac, sodales leo.

Etiam dui est, hendrerit id tempus nec, aliquam non diam. Vestibulum dui nisl, consequat eget neque sed, scelerisque fringilla lectus. Cras quis justo nisi. Nullam mattis ligula iaculis interdum hendrerit. Praesent rutrum turpis eget faucibus tempus. Aenean tempus porttitor ipsum, non pulvinar metus gravida in. Maecenas facilisis nisl vel diam vulputate pharetra. Pellentesque ipsum sem, tempor nec porta ac, sagittis non sapien. Duis vulputate ut elit in ultrices. Morbi et diam sed leo pellentesque consequat vitae et elit. Suspendisse pulvinar magna turpis, vel cursus justo aliquet at. Praesent lectus est, elementum vel finibus suscipit, posuere eget dolor. Duis dignissim eget sem in aliquet. Integer fringilla turpis varius, consequat nisl eget, commodo risus. Vivamus venenatis lacinia velit, nec mattis arcu gravida sit amet. Vivamus mattis gravida tempus.

Donec ut metus eleifend, ultricies eros nec, feugiat nunc. Aenean dignissim arcu vitae dolor porttitor, at scelerisque diam fermentum. Fusce at arcu risus. Quisque vel eleifend velit. Proin et sem at libero finibus vestibulum. Maecenas in nibh ipsum. Fusce vel enim convallis, ornare ipsum vitae, tristique leo. Mauris ultricies quis sapien vitae viverra. Donec sed varius lorem. Nunc lacinia a orci sed rhoncus.

Proin ante magna, hendrerit imperdiet dui sed, sodales vulputate orci. Nulla vel tempor arcu. Proin suscipit non velit sit amet sollicitudin. Sed mollis convallis lectus a aliquet. Nam vitae nibh posuere, dapibus metus ut, lacinia justo. Nullam tempus augue sed venenatis consectetur. Nulla bibendum erat erat. Donec eget tellus vitae nulla efficitur sagittis nec ac tellus. Nam laoreet orci non magna blandit facilisis. Vestibulum in elementum odio, quis ornare dui. Ut vitae mollis tellus, quis consequat ante. Nulla egestas vitae sem sit amet lobortis. Nullam nec augue congue, tempus massa eget, gravida turpis. In euismod arcu nibh, id viverra augue maximus eget. Donec sapien ligula, semper sed vestibulum et, posuere pretium dolor.

Mauris vel odio et velit euismod commodo ac at lectus. Vestibulum sagittis finibus sem id ultrices. Vestibulum tincidunt eros ut mi malesuada ultricies. Maecenas suscipit nulla turpis, in imperdiet quam aliquam et. Sed euismod consequat eros sit amet interdum. Phasellus lacus nisl, eleifend in eleifend ac, gravida et sem. Quisque sed lectus sit amet dui porttitor dapibus eget eget ligula. Phasellus tristique orci sed feugiat blandit. Etiam pulvinar tortor et libero congue, vel mollis nisl varius. Quisque efficitur nibh quam, et auctor est maximus a.

",
address: "22 W 38th St, New York, NY 10018, USA",
lat: 40.7513597,
lng: -73.9839223,
start_day: "2019/08/13",
start_time: "12:50",
group_id: demoG.id,
organizer_id: demoU.id
)
demoE.users << u1
demoE.users << u2
demoE.users << u3
demoE.users << u4
demoE.users << u5
demoE.users << u6
demoE.users << demoU