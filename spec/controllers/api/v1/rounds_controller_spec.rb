require 'rails_helper'

RSpec.describe Api::V1::RoundsController, type: :controller do
  it 'returns data required for a round' do
    image_service = double('image service')
    image_urls = ['image url', 'image url 2']

    expect(Term).to receive(:get_term).with('whatever').and_return(double('term', phrase: 'the phrase'))
    expect(ImageSearchService).to receive(:new).with(search_term: 'the phrase').and_return(image_service)
    expect(image_service).to receive(:call).and_return(image_urls)
    expect(image_urls).to receive(:sample).and_return(image_urls)

    get :show, format: :json, params: { id: 'whatever' }
    expect(response.code).to eq '200'

    expect(
      JSON.parse(response.body)
    ).to eq(
      'term'   => 'the phrase',
      'images' => [
        { 'id' => 0, 'src' => 'image url' },
        { 'id' => 1, 'src' => 'image url 2' }
      ]
    )
  end
end
