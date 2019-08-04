# == Schema Information
#
# Table name: groups
#
#  id          :bigint           not null, primary key
#  owner_id    :integer          not null
#  name        :string           not null
#  description :text             not null
#  location_id :integer          not null
#  private     :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Group < ApplicationRecord
    validates :owner_id, :location_id, presence: true
    validates :private, inclusion: { in: [ true, false ] }
    validates :name, length: {minimum: 5, maximum: 50}, presence: true
    validates :description, length: {minimum: 20, maximum: 1000}, presence: true

    belongs_to :owner,
        class_name: :User

    belongs_to :location

    has_many :group_memberships

    has_many :members,
        through: :group_memberships
    
end
