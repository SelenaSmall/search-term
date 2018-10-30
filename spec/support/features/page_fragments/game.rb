module PageFragments
  module Game
    def images
      browser.find_all('.images-container-single-image')
    end

    def fill_guess(guess)
      browser.find('.input-container-guess').fill_in(with: guess)
    end

    def next_round
      browser.find('.next-round').click
    end
  end
end