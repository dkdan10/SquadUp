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
#  start_time   :datetime         not null
#  end_time     :datetime         not null
#

class Event < ApplicationRecord
    validates :organizer_id, :group_id, :name, :description, :end_time, :start_time, presence: true
    validates :lat, :lng, :address, presence: true

    belongs_to :group

    belongs_to :organizer,
        class_name: :User
end
