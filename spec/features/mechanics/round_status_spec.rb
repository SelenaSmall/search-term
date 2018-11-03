require 'rails_helper'

feature 'Round Status', js: true do
  context 'game is setup with the minimum 1 term' do
    before do
      Term.create(phrase: 'test')
    end

    scenario 'Casper starts a round and data is not yet loaded' do
      When 'user on a round' do
        visit('/round/1')
      end

      Then 'status is loading' do
        # TODO only works because API is slow enough, it doesn't "stay that way"
        wait_for { focus_on(:status).status }.to eq('LOADING ...')
      end
    end

    scenario 'Casper starts a round and data is loaded' do
      When 'user on a round and the round loads' do
        visit('/round/1')
      end

      Then 'status is loading' do
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
      end
    end
  end
end
