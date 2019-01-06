class AddTitleAndStateToGames < ActiveRecord::Migration[5.2]
  class GameModel < ApplicationRecord
    self.table_name = "games"
  end

  def up
    add_column :games, :title, :string
    add_column :games, :state, :integer, default: 0

    GameModel.all.each do |game|
      game.update_attributes(title: "Game number #{game.id}")
    end

    change_column :games, :title, :string, null: false
    add_index :games, :title, unique: true
  end

  def down
    remove_column :games, :title
    remove_column :games, :state
  end
end
