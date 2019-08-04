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

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('locations')
ActiveRecord::Base.connection.reset_pk_sequence!('groups')
ActiveRecord::Base.connection.reset_pk_sequence!('group_memberships')

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
g4 = Group.create!(name:"Toyko Basketballers", description:"Lets all Squad up and play basketball together! Any skill level is welcome. Come through with a smile!", location_id: l3.id, private: false, owner_id: u1.id)
g4.members << u4
g5 = Group.create!(name:"Ram's social hour!", description:"This group is for friend's of Ram to hang out with Ram. It should be a blast. Stay tuned!", location_id: l1.id, private: false, owner_id: u5.id)
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
