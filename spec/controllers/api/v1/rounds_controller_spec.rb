require 'rails_helper'

RSpec.describe Api::V1::RoundsController, type: :controller do
  it 'returns data required for a round' do
    get :show, format: :json, params: { id: 'whatever' }
    pending 'need to return actual rounds content'
    expect(response.code).to eq '200'
  end
end
