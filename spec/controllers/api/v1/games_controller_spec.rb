require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do
  it 'returns data required for a game from the first best game' do
    mock_game = double(Game, rounds: 123)
    expect(Game).to receive(:first).and_return(mock_game)

    get :index, format: :json, params: { }
    expect(response.code).to eq '200'
    expect(JSON.parse(response.body)).to eq('rounds' => 123)
  end

  it 'returns 0 rounds if there are no games defined' do
    expect(Game).to receive(:first).and_return(nil)

    get :index, format: :json, params: { }
    expect(response.code).to eq '200'
    expect(JSON.parse(response.body)).to eq('rounds' => 0)
  end
end
