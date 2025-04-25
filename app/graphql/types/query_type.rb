# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    field :me, Types::UserType, null: true, description: "Fetches the current user"
    field :kits, [Types::KitType], null: true, description: "Fetches all kits" do
      argument :id, ID, required: false, description: "ID of the kit."
    end
    field :users, Types::UserType.connection_type, null: true, description: "Fetches all users" do
      argument :page, Integer, required: false, default_value: 1, description: "Page number for pagination."
      argument :per_page, Integer, required: false, default_value: 10, description: "Number of users per page."
      argument :filter, Types::UserFilterType, required: false, description: "Filter criteria for users."
    end

    def me
      context[:current_user]
    end

    def kits(id: nil)
      kits = if context[:current_user].admin?
        Kit.all
      else
        Kit.where(created_by_id: context[:current_user].id)
      end

      if id
        kits.where(id: id)
      else
        kits
      end
    end

    def users(page: 1, per_page: 10, filter: nil)
      offset = (page - 1) * per_page
      
      users = if context[:current_user].admin?
        users = User.all
        users = users.where("email ILIKE :search", search: "%#{filter[:email]}%") if filter[:email].present?
        users = users.where("created_at < :created_before", created_before: filter[:created_before]) if filter[:created_before].present?
        users = users.where("created_at > :created_after", created_after: filter[:created_after]) if filter[:created_after].present?
        users = users.where(role: filter[:role]) if filter[:role].present?
        users.offset(offset).limit(per_page)
      end

      users
    end
  end
end
