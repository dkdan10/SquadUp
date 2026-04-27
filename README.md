# SquadUp

[Project page](https://dkdan10.github.io/SquadUp/) &middot; [Live demo](https://squadup-uu1k.onrender.com)

Originally a 2019 capstone, relaunched in 2026 on a modernized runtime.

## Architecture and Technologies

* Ruby 3.1.6
* Ruby on Rails 6.1.7
* PostgreSQL
* Redis (Action Cable backend in production)
* React 16.8.6
* Redux 4.0.4
* React Router 5
* webpack 4.37.0

SquadUp is a single-page, full-stack web application modeled after MeetUp. SquadUp allows users to create groups and events that serve to connect people in real life according to their common interests. The clone was made with Ruby on Rails, PostgreSQL, React.js, and Redux. Live messaging was incorporated with Action Cable, Rails' built-in WebSockets layer.

The original Heroku deployment is no longer maintained. The repo is configured to deploy on Render via [render.yaml](render.yaml) — see [Hosting on Render](#hosting-on-render) below.

## Local setup

Use the pinned runtimes before installing dependencies:

* Ruby 3.1.6 (`.ruby-version`)
* Node 10.13.0 (`.node-version` / `.nvmrc`)
* PostgreSQL 13+

Install and prepare the app:

```sh
gem install bundler
bundle install
npm install
bin/rails db:setup
npm run webpack
bin/rails server
```

For frontend development with rebuilds:

```sh
npm run webpack:watch
```

Run the Rails tests:

```sh
bin/rails test
```

## Hosting on Render

The repository is configured for Render via [render.yaml](render.yaml) (Postgres + Redis + web service in one Blueprint). To deploy:

1. Push this repo to GitHub.
2. In the Render dashboard, **New → Blueprint** and point it at the repo. Render reads `render.yaml` and provisions the database, Redis, and web service.
3. Set the three secret env vars (Render won't sync them from the blueprint):
   * `GOOGLE_MAPS_API_KEY` — Google Maps Places API key.
   * `ACTION_CABLE_URL` — `wss://<your-render-host>/cable`.
   * `ACTION_CABLE_ALLOWED_ORIGINS` — `https://<your-render-host>`.

   `SECRET_KEY_BASE` is generated automatically by Render via `generateValue: true` in the Blueprint — no manual step. Encrypted credentials (`config/credentials.yml.enc`) are not used; all secrets are env-only.
4. Wait for the build (~5 min on first run). Render runs [bin/render-build.sh](bin/render-build.sh), which installs Ruby + Node deps, builds the Webpack bundle, precompiles assets, runs `db:prepare`, and runs `db:seed`. The seed file is idempotent — it short-circuits with `return if User.exists?` so subsequent deploys don't wipe data.
5. Smoke-test the live URL: sign up, create a group, RSVP to an event, send a chat message (verifies the Action Cable mount).

`Procfile` is also included for any other PaaS that auto-detects process types.

## Why MeetUp?

Meetup has a place close to my heart because when I was growing up I moved countries every two years. I would use Meetup to quickly find communities of people that share my interests. Meetup's mission of getting people to meet in the real world is something special to me.

## Authorization

Squadup has backend authentication through the use of a password digest. The password digest is hashed using BCrypt and stored in the database. There is also a persisted user state which allows a user to remain logged in through refresh with cookies. The appropriate error messages will also appear when a user logs in incorrectly or enters an invalid sign up form.

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

A user can search through Groups and Events on their splash page. An input field updates a search filter in the redux state. Additionally, it makes a debounced call to the database to receive Groups and Events that meet that search filter. Events can also be filtered by their start date using a calendar with selectable dates.

## Messaging

Squadup uses Rails Action Cable to allow users to connect to a chat room channel and receive messages from other users in their groups. There are two active connections created when a user goes to check their messages: a connection to get new messages from the chat they have open, and a connection to get new chats created with a new user.
