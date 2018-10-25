module PageFragments
  module Results
    def congratulations
      browser.find('.congratulations').text
    end

    def final_score
      browser.find('.final-score').text
    end
  end
end
