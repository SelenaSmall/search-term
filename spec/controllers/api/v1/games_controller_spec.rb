require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do
  it 'returns an array of games' do
    expect(Game).to receive(:where).and_return([])

    get :index, format: :json, params: {}
    expect(response.code).to eq '200'
    expect(JSON.parse(response.body)).to eq('games' => [])
  end

  # it 'returns a published game' do
  #   mock_game = double(Game, to_json: 'the game json')
  #   expect(Game).to receive(:where).and_return([mock_game])
  #   # expect(Game).to receive(:first).and_return(nil)
  #
  #   get :index, format: :json, params: {}
  #   expect(response.code).to eq '200'
  #   expect(JSON.parse(response.body)).to eq('games' => ['the game json'])
  # end
end
