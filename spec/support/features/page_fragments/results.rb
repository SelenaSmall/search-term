module PageFragments
  module Results
    def congratulations
      browser.find('.congratulations').text
    end
  end
end
