class AddUniqueForGroupMemberships < ActiveRecord::Migration[5.2]
  def change
    add_index :group_memberships, [:member_id, :group_id], unique: true
  end
end
