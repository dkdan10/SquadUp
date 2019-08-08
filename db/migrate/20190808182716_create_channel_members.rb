class CreateChannelMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_members do |t|
      t.integer :member_id, null: false
      t.integer :channel_id, null: false

      t.timestamps
      t.index [:member_id, :channel_id], unique: true
    end
  end
end
