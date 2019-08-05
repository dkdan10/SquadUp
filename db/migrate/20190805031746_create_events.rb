class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.integer :organizer_id, null: false
      t.integer :group_id, null: false
      t.string :name, null: false
      t.text :description, null: false

      t.string :address
      t.float :lat
      t.float :lng
      
      t.index :group_id
      t.index :organizer_id

      t.timestamps
    end
  end
end
