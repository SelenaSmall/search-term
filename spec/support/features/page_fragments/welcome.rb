module PageFragments
  module Welcome
    def text
      browser.find('h1').text
    end

    def start_game
      browser.click_on('Start Game')
    end
  end
end