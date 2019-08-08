class UpdateMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :sender_id, :integer, null: false
    add_column :messages, :channel_id, :integer, null: false
  end
end
