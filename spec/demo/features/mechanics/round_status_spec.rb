require 'rails_helper'

feature 'Round Status', js: true do
  context 'game is setup with the minimum 1 term' do
    before do
      game = Game.create(id: 1, title: "Oz Open", rounds: 1, game_style: :multi_choice)
      game.terms << Term.create(phrase: 'test')
    end

    scenario 'Casper starts a round and data is not yet loaded' do
      When 'user on a round sees loading' do
        with_api_route_paused do
          visit('/game/1/round/1')
          wait_for { focus_on(:status).status }.to eq('LOADING ...')
        end
      end

      Then 'the status updates to in progress' do
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
      end
    end

    scenario 'Casper starts a round and data is loaded' do
      When 'user on a round and the round loads' do
        visit('/game/1/round/1')
      end

      Then 'status is loading' do
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
      end
    end
  end

  context 'The database does not have the minimum setup' do
    scenario 'Casper tries to start a round and is informed there is an error' do
      When 'user on a round and the round loads' do
        visit('/game/1/round/1')
      end

      Then 'status is loading' do
        wait_for { focus_on(:status).status }.to eq('ERROR')
      end
    end
  end
end
