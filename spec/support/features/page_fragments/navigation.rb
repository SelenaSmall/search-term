module PageFragments
  module Navigation
    def update_profile
      browser.find('[data-test-id="update-profile"]', text: 'Profile').click
    end

    def back_to_landing_page
      browser.find('[data-test-id="landing-page-link"]', text: 'Game').click
    end
  end
end