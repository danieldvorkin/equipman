module Mutations
  class SignInUser < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :token, String, null: true
    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(email:, password:)
      user = User.find_by(email:)
      if user&.valid_password?(password)
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        { token:, user:, errors: [] }
      else
        { token: nil, user: nil, errors: ['Invalid credentials'] }
      end
    end
  end
end
