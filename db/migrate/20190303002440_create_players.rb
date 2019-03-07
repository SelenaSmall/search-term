class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players, id: :uuid do |t|
      t.timestamps
    end

    create_join_table :matches, :players, column_options: {type: :uuid} do |t|
      t.index [:match_id, :player_id], unique: true
    end
  end
end
