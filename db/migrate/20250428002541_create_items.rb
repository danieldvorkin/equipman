class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.string :url
      t.integer :created_by_id, null: false

      t.timestamps
    end
  end
end
