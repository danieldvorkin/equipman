class Kit < ApplicationRecord
  belongs_to :user, foreign_key: 'created_by_id', class_name: 'User'

  validates :name, presence: true
end
