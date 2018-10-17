require 'rails_helper'

feature 'Game play lifecycle', js: true do
  scenario 'WINNING a game' do
    When 'user starts the game' do
      visit('/')
      wait_for { focus_on(:welcome).text }.to eq('Welcome to the Game')

      focus_on(:welcome).start_game
    end

    Then 'the game commences' do
      wait_for { focus_on(:game).round }.to eq('1')

      pending 'There are no images!'
      wait_for { focus_on(:game).images.count }.to eq('1')
    end

    When 'the user submits an answer'
    # fill in form
    # click submit

    Then 'the user wins'
    # timer stops
    # see text 'WINNER'
    # see button 'play again'
  end
end
