class AddGameStyleToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :game_style, :integer, default: 0
  end
end
