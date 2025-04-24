module Mutations
  module Kits
    class DeleteKit < BaseMutation
      argument :id, ID, required: true

      field :success, Boolean, null: false
      field :errors, [String], null: false

      def resolve(id:)
        kit = Kit.find_by(id: id)

        if kit.nil?
          return { success: false, errors: ["Kit not found"] }
        end

        if kit.destroy
          { success: true, errors: [] }
        else
          { success: false, errors: kit.errors.full_messages }
        end
      end
    end
  end
end