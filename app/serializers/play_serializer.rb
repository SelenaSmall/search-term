class PlaySerializer < ActiveModel::Serializer
  attributes :id, :match_id, :text, :created_at
end
