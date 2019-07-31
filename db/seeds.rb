# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Location.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('locations')

l1 = Location.create!(name: "New York, NY", lat: 10, lng: 10)
l2 = Location.create!(name: "San Fransico, SF", lat: 30, lng: 20)
l3 = Location.create!(name: "Tokyo, JP", lat: 123, lng: -20)
l4 = Location.create!(name: "Paris, FR", lat: 12, lng: 42)

u1 = User.create!(username: "daniel", email: "daniel@keinan.com", password: "password", location_id: l1.id)
demoU = User.create!(username: "DemoUser", email: "demo@user.com", password: "password", location_id: l1.id)