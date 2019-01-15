module PageFragments
  module Admin
    def sign_in(email:, password:)
      browser.fill_in "Email", with: email
      browser.fill_in "Password", with: password
      browser.click_on "Sign in"
    end

    def flash_messages
      browser.find(".flash ").text
    end
  end
end