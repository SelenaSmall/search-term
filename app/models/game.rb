class Game < ApplicationRecord
  has_and_belongs_to_many :terms

  enum state: { published: 0, draft: 1 }
  enum game_style: { text: 0, multi_choice: 1 }

  def get_term_for_round(round)
    term_count = terms.length
    terms.order(:created_at).first(((round - 1) % term_count) + 1).last if term_count.positive?
  end

  def find_multi_choice(term)
    multi_choice_terms = terms.reject{|t| t==term}.shuffle.first(3)
    multi_choice_terms << term
    game_style == 'text' ? [] : multi_choice_terms.map(&:phrase).shuffle
  end
end
