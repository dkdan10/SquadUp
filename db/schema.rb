# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_08_182716) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_members", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id", "channel_id"], name: "index_channel_members_on_member_id_and_channel_id", unique: true
  end

  create_table "channels", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "event_rsvps", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "event_id"], name: "index_event_rsvps_on_user_id_and_event_id"
  end

  create_table "events", force: :cascade do |t|
    t.integer "organizer_id", null: false
    t.integer "group_id", null: false
    t.string "name", null: false
    t.text "description", null: false
    t.string "address"
    t.float "lat"
    t.float "lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "start_day"
    t.string "start_time"
    t.index ["group_id"], name: "index_events_on_group_id"
    t.index ["organizer_id"], name: "index_events_on_organizer_id"
  end

  create_table "group_memberships", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id", "group_id"], name: "index_group_memberships_on_member_id_and_group_id", unique: true
  end

  create_table "groups", force: :cascade do |t|
    t.integer "owner_id", null: false
    t.string "name", null: false
    t.text "description", null: false
    t.integer "location_id", null: false
    t.boolean "private", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_groups_on_location_id"
    t.index ["owner_id"], name: "index_groups_on_owner_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.float "lat", null: false
    t.float "lng", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.string "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sender_id", null: false
    t.integer "channel_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "location_id", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["location_id"], name: "index_users_on_location_id"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username"
  end

end
