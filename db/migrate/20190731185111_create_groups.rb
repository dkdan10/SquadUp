class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false
      t.text :description, null: false
      t.integer :location_id, null: false
      t.boolean :private, null: false, default: false

      t.timestamps

      t.index :owner_id
      t.index :location_id
    end
  end
end
