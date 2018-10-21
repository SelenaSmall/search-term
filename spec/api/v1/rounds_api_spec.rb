require 'rails_helper'

describe Api::V1::RoundsController, type: :controller do
  describe 'get' do
    it 'should retrieve rounds data' do
      Term.create(phrase: 'tequila')

      get(:show, params: {id: 1}, format: :json)

      expect(response.code).to eq '200'

      expect(JSON.parse(response.body)).to eq({'term' => 'tequila'})
    end
  end
end
