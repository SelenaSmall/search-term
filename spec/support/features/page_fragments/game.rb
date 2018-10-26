module PageFragments
  module Game
    def round
      browser.find('.round').text
    end

    def images
      browser.find_all('.images-container-single-image')
    end

    def fill_guess(guess)
      browser.find('.input-container-guess').fill_in(with: guess)
    end

    def status
      browser.find('.status .status-menu-item-value').text
    end

    def timer
      browser.find('.timer').text
    end

    def score
      browser.find('.score').text
    end

    def next_round
      browser.find('.next-round').click
    end
  end
end