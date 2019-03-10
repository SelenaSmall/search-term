require 'rails_helper'

feature 'profile', js: true do
  scenario 'User from the internet ads alias' do
    When 'User from internet sets alias to "princess"' do
      visit('/profile')
      focus_on(:profile).set_alias("princess")
      focus_on(:profile).submit
    end

    Then 'alias is set to "princess"' do
      pending 'no success message'
      wait_for { focus_on(:alert).message }.to eq('succesfully updated alias to "princess"')
      wait_for { focus_on(:profile).alias }.to eq("princess")
    end
  end
end