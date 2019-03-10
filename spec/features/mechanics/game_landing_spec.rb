require 'rails_helper'

feature 'game landing', js: true do
  scenario 'Update Profile takes you to the update profile page' do
    When 'a user visits the update profile link' do
      visit('/')
      focus_on(:game).update_profile
    end

    Then 'they are on the update profile first page' do
      wait_for { focus_on(:profile).progress_steps }.to eq [
                '1 Id',
                '2 Alias',
                '3 Email',
                '4 Avatar',
                '5 Confirmation'
              ]
    end
  end

  scenario 'a user can go back to the landing page from the profile page' do
    When 'a user lands on the profile page and they click link to landing page' do
      visit('/profile')
      focus_on(:navigation).back_to_landing_page
    end

    Then 'they find themselves on the landing page' do
      wait_for { focus_on(:landing).on_landing }.to be_truthy
    end
  end
end