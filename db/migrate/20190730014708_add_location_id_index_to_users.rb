class AddLocationIdIndexToUsers < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :location_id
  end
end
