module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :url, String, null: true
    field :kit_id, Integer, null: false
    field :created_by, Types::UserType, null: false
    field :quantity, Float, null: false
    # field :active, Boolean, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end