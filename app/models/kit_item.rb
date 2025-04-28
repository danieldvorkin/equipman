class KitItem < ApplicationRecord
  belongs_to :kit
  belongs_to :item

  validates :kit_id, presence: true
  validates :item_id, presence: true
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }
end
