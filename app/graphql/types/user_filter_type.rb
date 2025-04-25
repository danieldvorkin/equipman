module Types
  class UserFilterType < Types::BaseInputObject
    argument :email, String, required: false
    argument :created_before, GraphQL::Types::ISO8601DateTime, required: false
    argument :created_after, GraphQL::Types::ISO8601DateTime, required: false
    argument :role, String, required: false
  end
end