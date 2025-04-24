class CreateKits < ActiveRecord::Migration[7.0]
  def change
    create_table :kits do |t|
      t.string :name
      t.string :description
      t.string :version
      t.boolean :active, default: false
      t.integer :created_by_id

      t.timestamps
    end
  end
end
