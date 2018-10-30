require 'rails_helper'

feature 'Game play lifecycle', js: true do
  context 'the game terms are configured' do
    before do
      Game.create(rounds: 2)
      Term.create(phrase: 'tequila')
    end

    scenario 'WINNING a game' do
      When 'user starts the game' do
        visit('/')
        wait_for { focus_on(:welcome).text }.to eq('Welcome to the Game')

        focus_on(:welcome).start_game
      end

      Then 'the game commences' do
        wait_for { focus_on(:status).round }.to eq('1')
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
        wait_for { focus_on(:status).timer }.to match(/[0-9]/)
        wait_for { focus_on(:game).images.count }.to eq(9)
      end

      When 'the user submits an answer' do
        focus_on(:game).fill_guess('tequila')
      end

      Then 'the user wins the round' do
        wait_for { focus_on(:status).status }.to eq('WINNER')
        wait_for { focus_on(:status).score }.to match(/[0-9]/)
      end

      When 'the user starts the next round' do
        focus_on(:game).next_round
      end

      Then 'round two starts' do
        wait_for { focus_on(:status).round }.to eq('2')
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
        wait_for { focus_on(:status).timer }.to match(/[0-9]/)
        wait_for { focus_on(:game).images.count }.to eq(9)
      end

      When 'the user submits a number of answers including the right one' do
        focus_on(:game).fill_guess("bottle alcohol\n tequila")
      end

      Then 'the user wins the round' do
        wait_for { focus_on(:status).status }.to eq('WINNER')
        wait_for { focus_on(:status).score }.to match(/[0-9]/)
      end

      When 'the user starts the next round' do
        focus_on(:game).next_round
      end

      And 'Game is finished with a final score' do
        wait_for { focus_on(:results).congratulations }.to eq('Congratulations!')
        wait_for { focus_on(:results).final_score }.to match(/[0-9]/)
      end
    end
  end
end
