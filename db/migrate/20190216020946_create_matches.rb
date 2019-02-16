class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches, id: :uuid do |t|
      t.string :title

      t.timestamps
    end
  end
end
