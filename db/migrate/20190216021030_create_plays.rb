class CreatePlays < ActiveRecord::Migration[5.2]
  def change
    create_table :plays, id: :uuid do |t|
      t.string :text
      t.references :match, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
