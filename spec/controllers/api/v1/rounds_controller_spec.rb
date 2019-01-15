require 'rails_helper'

RSpec.describe Api::V1::RoundsController, type: :controller do
  it 'returns data required for a round' do
    image_service = double('image service')
    image_urls = ['image url', 'image url 2']

    mock_term = double('term', phrase: 'the phrase')
    mock_game = double(Game)
    expect(mock_game).to receive(:get_term_for_round).with(567).and_return(mock_term)
    expect(mock_game).to receive(:find_multi_choice).with(mock_term).and_return([])
    expect(Game).to receive(:find).with('game id').and_return(mock_game)
    # expect(Term).to receive(:get_term).with('whatever').and_return(mock_term)
    expect(ImageSearchService).to receive(:new).with(search_term: 'the phrase').and_return(image_service)
    expect(image_service).to receive(:call).and_return(image_urls)
    expect(image_urls).to receive(:sample).and_return(image_urls)

    get :show, format: :json, params: { id: '567 whatever', gameName: 'game id' }
    expect(response.code).to eq '200'

    expect(
      JSON.parse(response.body)
    ).to eq(
      'term'   => 'the phrase',
      'terms'  => [],
      'images' => [
        { 'id' => 0, 'src' => 'image url' },
        { 'id' => 1, 'src' => 'image url 2' }
      ],
    )
  end
end
