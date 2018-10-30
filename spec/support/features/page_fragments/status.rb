module PageFragments
  module Status
    def round
      browser.find('.round').text
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
  end
end