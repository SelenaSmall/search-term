class AddFeaturedImageUrlToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :featured_image_url, :string
  end
end
