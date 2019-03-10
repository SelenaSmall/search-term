require 'rails_helper'

feature 'User signup', js: true do
  context 'First time visitor' do
    scenario 'A first time visitor is overwhelmed by signup process and returns to the landing page' do
      When 'a first time visitor visits the landing page' do
        visit('/')
        focus_on(:landing).on_landing
        wait_for { focus_on(:landing).on_landing }.to be_truthy
      end

      And 'they click on update profile link' do
        focus_on(:navigation).update_profile
      end

      Then 'they are shown progress of profile' do
        wait_for { focus_on(:profile).progress_steps }.to eq [
                 '1 Id',
                 '2 Alias',
                 '3 Email',
                 '4 Avatar',
                 '5 Confirmation'
               ]
      end

      When 'they click on the brand link' do
        focus_on(:navigation).back_to_landing_page
      end

      Then 'they find themsleves on the landing page' do
        wait_for { focus_on(:landing).on_landing }.to be_truthy
      end
    end

    scenario 'A first time visitor adds an alias to their profile' do
      When 'a first time visitor visits the profile page' do
        visit('/profile')
      end

      And 'they add the alias "princess"' do
        pending 'no way to set alias'
        focus_on(:profile).set_alias("princess")
        focus_on(:profile).submit
      end

      Then 'the alias is successfully processed' do
        wait_for { focus_on(:profile).progress }
      end
    end
  end
end
