module PageFragments
  module Game
    def round
      browser.find('.round').text
    end

    def images
      browser.find_all('.image')
    end
  end
end