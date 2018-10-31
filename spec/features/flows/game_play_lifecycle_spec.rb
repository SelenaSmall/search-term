require 'rails_helper'

feature 'Game play lifecycle', js: true do
  context 'the game terms are configured' do
    before do
      Game.create(rounds: 2)
      Term.create(phrase: 'ghost')
      Term.create(phrase: 'haunted house')
    end

    scenario 'WINNING a game' do
      When 'user starts the game' do
        visit('/')
        wait_for { focus_on(:welcome).text }.to eq('Welcome to the Game')

        binding.pry
        focus_on(:welcome).start_game
      end

      Then 'the game commences' do
        wait_for { focus_on(:status).round }.to eq('1')
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
        wait_for { focus_on(:status).timer }.to match(/[0-9]/)
        wait_for { focus_on(:game).images.count }.to eq(9)
      end

      When 'the user submits an answer' do
        binding.pry
        focus_on(:game).fill_guess('ghost')
      end

      Then 'the user wins the round' do
        wait_for { focus_on(:status).status }.to eq('WINNER')
        wait_for { focus_on(:status).score }.to match(/[0-9]/)
      end

      When 'the user starts the next round' do
        binding.pry
        focus_on(:game).next_round
      end

      Then 'round two starts' do
        wait_for { focus_on(:status).round }.to eq('2')
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
        wait_for { focus_on(:status).timer }.to match(/[0-9]/)
        wait_for { focus_on(:game).images.count }.to eq(9)
      end

      When 'the user submits wrong guess' do
        binding.pry
        focus_on(:game).fill_guess("haunted\n")
      end

      Then 'the status stays as in progress' do
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
      end

      When 'the user keeps typing and guesses correctly' do
        binding.pry
        focus_on(:game).have_another_guess("haunted house")
      end

      Then 'the user wins the round' do
        wait_for { focus_on(:status).status }.to eq('WINNER')
        wait_for { focus_on(:status).score }.to match(/[0-9]/)
      end

      When 'the user starts the next round' do
        binding.pry
        focus_on(:game).next_round
      end

      Then 'Game is finished with a final score' do
        wait_for { focus_on(:results).congratulations }.to eq('Congratulations!')
        binding.pry
        wait_for { focus_on(:results).final_score }.to match(/[0-9]/)
      end
    end
  end
end
