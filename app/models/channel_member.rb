# == Schema Information
#
# Table name: channel_members
#
#  id         :bigint           not null, primary key
#  member_id  :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ChannelMember < ApplicationRecord
    validates :member_id, :channel_id, presence: true

    belongs_to :member,
        class_name: :User

    belongs_to :channel
end
