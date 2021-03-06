require 'rails_helper'

describe Api::V1::RoundsController, type: :controller do
  describe 'get' do
    it 'should retrieve rounds data' do
      game = Game.create(id: 1, title: "Test")
      game.terms << Term.create(phrase: 'tequila')

      VCR.use_cassette('google_image_search') do
        get(:show, params: { id: 1, gameName: 1 }, format: :json)
      end

      expect(response.code).to eq '200'

      expect(JSON.parse(response.body)).to match(hash_including('term' => 'tequila'))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 0))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 1))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 2))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 3))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 4))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 5))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 6))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 7))))
      expect(JSON.parse(response.body)).to match(hash_including('images' => array_including(hash_including('id' => 8))))
    end
  end
end
