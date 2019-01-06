class Game < ApplicationRecord
  has_and_belongs_to_many :terms

  enum state: { published: 0, draft: 1 }

  def get_term_for_round(round)
    term_count = terms.length
    terms.order(:created_at).first(((round - 1) % term_count) + 1).last if term_count.positive?
  end
end
