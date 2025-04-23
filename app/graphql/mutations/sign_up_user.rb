module Mutations
  class SignUpUser < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(email:, password:)
      user = User.new(email: email, password: password)
      if user.save
        context[:current_user] = user
        { user:, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    end
  end
end
