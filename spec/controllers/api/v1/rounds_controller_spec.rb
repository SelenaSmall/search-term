require 'rails_helper'

RSpec.describe Api::V1::RoundsController, type: :controller do
  it 'returns data required for a round' do
    expect(Term).to receive(:first).and_return(double('term', phrase: 'the phrase'))

    get :show, format: :json, params: { id: 'whatever' }
    expect(response.code).to eq '200'

    expect(JSON.parse(response.body)).to eq('term' => 'the phrase')
  end
end
