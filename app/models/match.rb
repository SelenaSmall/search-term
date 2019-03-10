class Match < ApplicationRecord
  has_many :plays
  has_and_belongs_to_many :players
  belongs_to :player, optional: true
end
