class AddTimeToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :start_time, :datetime, null: false
    add_column :events, :end_time, :datetime, null: false
  end
end
