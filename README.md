# SquadUp

## Architecture and Technologies
Squadup was built using:

* JavaScript 9
* Ruby 2.5.1
* React 16.8.6
* Redux 4.0.4
* Ruby on Rails 5.2.3
* PostgreSQL
* webpack 4.37.0

SquadUp is a single-page, full-stack web application modeled after MeetUp. SquadUp allows for users to create groups and events the serve to connect people in real life acoording to their common intrests. The clone was made with Ruby on Rails, PostgresSQL, React.js and Redux. Live messaging was incorporated with Application Cables, Rails built in Websockets. 

[Visit the live site](http://squadup-aa.herokuapp.com/)

## Why MeetUp?

Meetup has a place close to my heart because when I was growing up I moved countries every two years. I would use Meetup to quickly find communities of people that share my intrests. Meetup's mission of getting people to meet in the real world is something special to me.

## Authorization

Squadup has backend authentication through the use of a password digest. The password digest is hashed using BCrypt and stored in the database. There is also a persisted user state which allows a user to remain logged in through refresh with cookies. The approrate error messages will also appear when a user logs in incorrectly or enters an invalid sign up form. 

## Groups

Every group must have a minimum of the following to be created:
* Owner
* Location
* Name
* Description

The group creation form is a 5 step form that takes advantage of sibling React components. Each component is responsible for filling out one of the required fields for a group (e.g. Location, Name, or Description). The parent of these 5 sibling step components controls the state of the new group being created. 

Modular components allow for the user to edit their group using the same form. 

Both the create and edit group forms are protected by Auth Routes. This means that only a logged in user can create or edit a group. Moreover, if a logged in user tries to edit a group that they did not create, they will also be redirected. 

## Events

Groups also contain events. If you are the owner of a group, you can create events for that group. 
Every event must have a minimum of the following to be created:
* Organizer
* Group
* Name
* Description 
* Start Time
* Start Day
* Location

The event form has a few unique features. In order to pick the date of the event I implemented a React Date Picker, created by Airbnb. 
Also, in order to get an address for the locations a user would input, the input is initialized with Google Places. 

## Search and Filter Features

A user can search though Groups and Events on their splash page. An input field updates a search filter in the redux state. Aditionally it makes a debounced call to the database to recieve Groups and Events that meet that search filter. Events can also be filter by their start date using a calender with selectable dates. 

## Messaging

Squadup uses Rails Action Cables to allow users to connected to a chat room channel and recieve messages from other users in their groups. There are two active connections created when a user goes to check their messages, a connection to get new messages from the chat they have open and a connection to get new chats created with a new user. 