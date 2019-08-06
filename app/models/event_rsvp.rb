# == Schema Information
#
# Table name: event_rsvps
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  event_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class EventRsvp < ApplicationRecord 
    validates :user_id, :event_id, presence: true

    belongs_to :user

    belongs_to :event
end
