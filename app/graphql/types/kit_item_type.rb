module Types
  class KitItemType < Types::BaseObject
    field :id, ID, null: false
    field :kit_id, Integer, null: false
    field :item, Types::ItemType, null: false
    field :quantity, Float, null: false
    field :active, Boolean, null: false
    field :created_by, Types::UserType, null: false

    def item 
      object.item if object.item.present?
    end
  end
end