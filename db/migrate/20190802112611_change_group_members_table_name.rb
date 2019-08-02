class ChangeGroupMembersTableName < ActiveRecord::Migration[5.2]
  def change
      rename_table :group_members, :group_memberships
  end
end
