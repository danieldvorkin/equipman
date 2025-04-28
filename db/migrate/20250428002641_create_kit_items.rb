class CreateKitItems < ActiveRecord::Migration[7.0]
  def change
    create_table :kit_items do |t|
      t.integer :item_id
      t.integer :kit_id
      t.float :quantity, default: 0.0
      t.boolean :active, default: true

      t.timestamps
      t.index [:item_id, :kit_id], unique: true
    end
  end
end
