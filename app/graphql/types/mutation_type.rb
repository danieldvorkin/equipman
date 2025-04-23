module Types
  class MutationType < Types::BaseObject
    field :sign_in_user, mutation: Mutations::SignInUser
    field :sign_up_user, mutation: Mutations::SignUpUser
  end
end
