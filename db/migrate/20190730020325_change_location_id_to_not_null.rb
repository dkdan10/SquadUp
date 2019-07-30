class ChangeLocationIdToNotNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :location_id, false
  end
end
