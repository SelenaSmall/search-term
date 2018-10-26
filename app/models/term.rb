class Term < ActiveRecord::Base
  def self.get_term(round)
    terms = Term.count
    all.order(:created_at).first(((round.to_i - 1) % terms)+1).last if terms > 0
  end
end