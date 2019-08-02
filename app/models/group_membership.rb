# == Schema Information
#
# Table name: group_memberships
#
#  id         :bigint           not null, primary key
#  member_id  :integer          not null
#  group_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GroupMembership < ApplicationRecord
    belongs_to :member,
        class_name: :User

    belongs_to :group
end
