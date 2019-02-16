class MatchSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :plays
end
