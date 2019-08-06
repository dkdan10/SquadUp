# == Schema Information
#
# Table name: events
#
#  id           :bigint           not null, primary key
#  organizer_id :integer          not null
#  group_id     :integer          not null
#  name         :string           not null
#  description  :text             not null
#  address      :string
#  lat          :float
#  lng          :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  start_day    :string
#  start_time   :string
#

class Event < ApplicationRecord
    validates :organizer_id, :group_id, :name, :description, :start_time, :start_day, presence: true
    validates :lat, :lng, :address, presence: true

    belongs_to :group

    belongs_to :organizer,
        class_name: :User

    has_many :event_rsvps,
        foreign_key: :event_id,
        class_name: :EventRsvp

    has_many :users,
        through: :event_rsvps,
        source: :user
end
