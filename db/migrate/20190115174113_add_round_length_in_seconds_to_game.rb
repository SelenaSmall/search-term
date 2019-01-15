class AddRoundLengthInSecondsToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :seconds_per_round, :integer, default: 10
  end
end
