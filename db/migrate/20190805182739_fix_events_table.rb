class FixEventsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :end_time
    remove_column :events, :start_time
    add_column :events, :start_day, :string
    add_column :events, :start_time, :string
  end
end
