module PageFragments
  module Profile
    def title
      browser.find('title')
    end

    def progress_steps
      browser.find_all('[data-test-id="profile-steps"] [data-test-id|="step"]').map(&:text).map{|text| text.gsub(/\s+/, ' ')}
    end

    def set_alias(alias_text)
      browser.fill_in 'alias', with: alias_text
    end

    def submit
      # browser.click_on 'submit'
      browser.find('button[type="submit"]').click
    end
  end
end