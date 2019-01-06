class CreateJoinTableGamesTerms < ActiveRecord::Migration[5.2]
  def change
    # create_join_table :games, :terms, column_options: {type: :uuid} do |t|
    #   t.index [:game_id, :term_id]
    # end
    create_table :games_terms, id: false do |t|
      t.references :game, foreign_key: true, type: :integer, index: true
      t.references :term, foreign_key: true, type: :uuid, index: true
    end
  end
end
