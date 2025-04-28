class Item < ApplicationRecord
  belongs_to :user, foreign_key: 'created_by_id', class_name: 'User'
  has_many :kit_items, dependent: :destroy
  has_many :kits, through: :kit_items

  validates :name, presence: true
end
