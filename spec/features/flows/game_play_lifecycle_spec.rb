require 'rails_helper'

feature 'Game play lifecycle', js: true do
  scenario 'WINNING a game' do
    When 'user starts the game' do
      visit('/')
      wait_for { focus_on(:welcome).text }.to eq('Welcome to the Game')

      focus_on(:welcome).start_game
    end

    Then 'the game commences' do
      pending 'start game button doesnt start a game!'
      wait_for { focus_on(:game).round }.to eq('1')
    end
  end
end
