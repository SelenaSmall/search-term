module PageFragments
  module Admin
    module Term
      def create_term(text)
        browser.click_on "Terms"
        browser.click_on "New term"
        browser.fill_in "Phrase", with: text
        browser.click_on "Create Term"
      end
    end
  end
end
