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

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('locations')
ActiveRecord::Base.connection.reset_pk_sequence!('groups')

l1 = Location.create!(name: "New York, NY", lat: 10, lng: 10)
l2 = Location.create!(name: "San Fransico, SF", lat: 30, lng: 20)
l3 = Location.create!(name: "Tokyo, JP", lat: 123, lng: -20)
l4 = Location.create!(name: "Paris, FR", lat: 12, lng: 42)
l5 = Location.create!(name: "Barcelona, SP", lat: 12, lng: 42)

u1 = User.create!(username: "daniel", email: "daniel@keinan.com", password: "password", location_id: l1.id)
u2 = User.create!(username: "henDog", email: "henry@tan.com", password: "password", location_id: l3.id)
u3 = User.create!(username: "spenki", email: "sen@ki.com", password: "password", location_id: l5.id)
u4 = User.create!(username: "georgie!", email: "george@peni.com", password: "password", location_id: l4.id)
demoU = User.create!(username: "DemoUser", email: "demo@user.com", password: "password", location_id: l1.id)

g1 = Group.create!(name:"First Group", description:"This is the first group", location_id: l1.id, private: false, owner_id: u1.id)
g2 = Group.create!(name:"Second Group", description:"This is the second group", location_id: l3.id, private: false, owner_id: u2.id)
g2 = Group.create!(name:"Third Group", description:"This is the third group", location_id: l5.id, private: false, owner_id: u3.id)
g2 = Group.create!(name:"Fourth Group", description:"This is the fourth group", location_id: l4.id, private: false, owner_id: u4.id)