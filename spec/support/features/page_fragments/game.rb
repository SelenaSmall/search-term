module PageFragments
  module Game
    def round
      browser.find('.round').text
    end

    def images
      browser.find_all('.image')
    end

    def fill_guess(guess)
      browser.find('.guess').fill_in(with: guess)
    end

    def status
      browser.find('.status').text
    end
  end
end