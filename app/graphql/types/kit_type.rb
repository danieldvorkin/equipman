module Types
  class KitType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :created_by, Types::UserType, null: true
    field :version, String, null: true
    field :active, Boolean, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :kit_items, [Types::KitItemType], null: true

    def created_by
      object.created_by_id ? User.find(object.created_by_id) : nil
    end
  end
end