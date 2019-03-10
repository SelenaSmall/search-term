class AddCommandingPlayerToMatches < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :player_id, :uuid
  end
end
