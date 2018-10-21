require 'rails_helper'

describe Api::V1::RoundsController, type: :controller do
  describe 'get' do
    it 'should retrieve rounds data' do
      get(:show, params: { id: 1 }, format: :json)

      pending 'no controller yet'
      expect(response.code).to eq '200'

    end
  end
end
