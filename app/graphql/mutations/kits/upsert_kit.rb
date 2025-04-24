module Mutations
  module Kits
    class UpsertKit < BaseMutation
      argument :id, ID, required: false
      argument :name, String, required: false
      argument :description, String, required: false
      argument :version, String, required: false
      argument :active, Boolean, required: false
      argument :created_by_id, ID, required: true

      field :kit, Types::KitType, null: true
      field :errors, [String], null: false

      def resolve(id: nil, name:, description: nil, version: nil, active: nil, created_by_id:)
        kit = id.present? ? Kit.find_by(id: id) : Kit.new

        if kit.nil?
          return { kit: nil, errors: ["Kit not found"] }
        end

        kit.assign_attributes(
          name: name.presence || kit.name,
          description: description.presence || kit.description,
          version: version.presence || kit.version,
          active: active.nil? ? kit.active : active,
          created_by_id: created_by_id.presence || kit.created_by_id
        )

        if kit.save
          { kit: kit, errors: [] }
        else
          { kit: nil, errors: kit.errors.full_messages }
        end
      end
    end
  end
end