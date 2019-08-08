# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  sender_id  :integer          not null
#  channel_id :integer          not null
#

class Message < ApplicationRecord
    validates :sender_id, :channel_id, presence: true

    belongs_to :channel

    belongs_to :sender,
        class_name: :User
end
