class CreateTerms < ActiveRecord::Migration[5.2]
  def change
    create_table :terms, id: :uuid do |t|
      t.string :phrase

      t.timestamps
    end
  end
end
