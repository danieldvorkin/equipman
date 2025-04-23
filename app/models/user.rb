class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
  
  ROLES = %w[user admin].freeze

  validates :role, inclusion: { in: ROLES }

  def role=(value)
    super(value.to_s)
  end

  def user?
    role == 'user'
  end

  def admin?
    role == 'admin'
  end
end
