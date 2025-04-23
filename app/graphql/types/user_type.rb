module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :is_admin, Boolean, null: false

    def is_admin
      object.role == "admin"
    end
  end
end
