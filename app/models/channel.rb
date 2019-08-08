# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
    has_many :messages

    has_many :channel_members

    has_many :members,
        through: :channel_members,
        source: :member
    
end
