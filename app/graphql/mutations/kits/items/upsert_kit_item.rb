module Mutations
  module Kits
    module Items
      class UpsertKitItem < BaseMutation
        argument :id, ID, required: false
        argument :name, String, required: false
        argument :url, String, required: false
        argument :quantity, Float, required: false
        argument :active, Boolean, required: false
        argument :kit_id, ID, required: false
        argument :created_by_id, ID, required: true

        field :kit_item, Types::ItemType, null: true
        field :errors, [String], null: false

        def resolve(id: nil, name: nil, url: nil, kit_id: nil, quantity: nil, active: true, created_by_id:)
          kit_item = id.present? ? KitItem.find_by(id: id) : KitItem.new

          if kit_item.nil?
            return { kit_item: nil, errors: ["KitItem not found"] }
          end

          # Ensure the associated Kit exists
          kit = Kit.find_by(id: kit_id) if kit_id.present?
          return { kit_item: nil, errors: ["Kit not found"] } if kit_id.present? && kit.nil?

          # Ensure the associated Item exists or create a new one if name or url is provided
          item = kit_item.item || Item.new
          if name.present? || url.present?
            item.assign_attributes(
              name: name.presence || item.name,
              url: url.presence || item.url,
              created_by_id: created_by_id,
            )
            unless item.save
              return { kit_item: nil, errors: item.errors.full_messages }
            end
          end

          kit_item.assign_attributes(
            item: item,
            kit: kit || kit_item.kit,
            quantity: quantity.presence || kit_item.quantity,
            active: active.nil? ? kit_item.active : active,
          )

          if kit_item.save
            { kit_item: kit_item, errors: [] }
          else
            { kit_item: nil, errors: kit_item.errors.full_messages }
          end
        end
      end
    end
  end
end