require 'rails_helper'

module Services
  describe ImageSearchService do
    it 'finds images using the search term provided' do
      result_array = [ '1' => 'image 1', '2' => 'image 2']
      doc = double('doc')

      expect(Nokogiri::HTML).to receive(:parse).and_return(doc)
      expect(doc).to receive(:css).with('img').and_return(result_array)
      expect(result_array).to receive(:map).and_return('an array of images')

      images = ImageSearchService.new(search_term: 'tequila')

      expect(images.call).to eq('an array of images')
    end
  end
end
