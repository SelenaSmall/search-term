module PageFragments
  module Game
    def round
      browser.find('.round').text
    end
  end
end