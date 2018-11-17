class ImageSearchService
  def initialize(search_term:)
    @search_term = search_term
  end

  def call
    results = open("https://www.google.com.au/search?q=#{@search_term}&source=lnms&tbm=isch").read
    doc = Nokogiri::HTML.parse(results)
    doc.css("img").map { |image| image[:src] }
  end
end
