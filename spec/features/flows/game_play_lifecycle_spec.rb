require 'rails_helper'

feature 'Game play lifecycle', js: true do
  scenario 'WINNING a game' do
    When 'user starts the game' do
      visit('/')
      wait_for { focus_on(:welcome).text }.to eq('Welcome to the Game')
    end
  end
end
