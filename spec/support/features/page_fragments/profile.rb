module PageFragments
  module Profile
    def title
      browser.find('title')
    end

    def progress_steps
      browser.find_all('[data-test-id="profile-steps"] [data-test-id|="step"]').map(&:text).map{|text| text.gsub(/\s+/, ' ')}
    end
  end
end