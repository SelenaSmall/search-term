require 'rails_helper'

feature 'Game play lifecycle', js: true do
  context """
    Michael is a user configured
    with the role of admin
    and 1password
  """ do

    before do
      # @1password = ''
      @user = User.create(
          email:    "saramic@gmail.com",
          role:     "admin",
          password: "1password"
      )
    end

    scenario """
      Michael sets up a game with
      2 rounds and some terms
      which is played by a user from the internet
    """ do
      When "Michael signs in as admin" do
        # TODO can we not just step through this and have only 1 binding pry?
        # maybe through a break 33 break 34 statement? cut and paste? autogenerate with # break comment?
        # binding.pry
        # TODO page fragment
        # TODO make font bigger on the login page
        # TODO auto size the borwser to the right size
        visit("http://localhost:4011/admin")
        # binding.pry
        fill_in "Email", with: @user.email
        fill_in "Password", with: @user.password
        # binding.pry
        click_on "Sign in"
      end

      Then "He is in the admin dashboard" do
        # TODO why pleas sign in to continue?
        # TODO page fragment
        wait_for { page.find(".flash").text }.to eq "Please sign in to continue."
        # binding.pry
      end

      When "He goes to create some new terms" do
        click_on "Terms"
        click_on "New term"
        fill_in "Phrase", with: "Caroline Wozniacki"
        # binding.pry
        click_on "Create Term"
        # binding.pry

        click_on "Terms"
        click_on "New term"
        fill_in "Phrase", with: "Roger Federer"
        # binding.pry
        click_on "Create Term"
        # binding.pry
        # live code to this
        # focus_on(:admin, :term).create_term("Caroline Wozniacki")
        # focus_on(:admin, :term).create_term("Roger Federer")
      end

      Then "2 terms are created for 2018 AO winners" do
        click_on "Terms"
        # binding.pry
        page.find("table").find_all("tr").map
        wait_for do
          page.find("table").find_all("tr").map { |tr| tr.text }
        end.to include(
                   /Caroline Wozniacki/,
                   /Roger Federer/
               )
        # binding.pry
      end

      When "He creates a Game" do
        click_on "Games"
        click_on "New game"
        fill_in "Title", with: "2018 AO"
        fill_in "Rounds", with: "2"
        fill_in "Featured image url", with: "https://media.istockphoto.com/photos/tennis-players-playing-a-match-on-the-court-picture-id817164728?k=6&m=817164728&s=612x612&w=0&h=mdlhalinhCbAz85nZHcH4HHwV8NF7Ju3tbW6mkxmvP4="
        fill_in "State", with: "published"
        fill_in "Game style", with: "multi_choice"
        # binding.pry

        fill_in "Terms", with: "Term: Caroline Wozniacki"
        find('#game_term_ids-selectized').send_keys(:enter)
        fill_in "Terms", with: "Term: Roger Federer"
        find('#game_term_ids-selectized').send_keys(:enter)

        click_on "Create Game"
        # binding.pry
      end

      Then "A game is successfully created" do
        wait_for { page.find("div.flash-notice").text }.to eq("Game was successfully created.")
      end

      And "the game is publicly available to play" do
        # TODO: find STATE: 'published'
      end

      When "Someone opens the app" do
        visit('/')
        # binding.pry
      end

      Then "the 2018 AO Winners game is visible" do
        wait_for { focus_on(:welcome).text }.to eq('Welcome to the Game')
        wait_for { page.find(".game-title").text }.to eq('2018 AO')
        # binding.pry
      end

      When 'user starts the game' do
        focus_on(:welcome).start_game
      end

      Then 'the game commences' do
        wait_for { focus_on(:status).round }.to eq('1')
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
        wait_for { focus_on(:status).timer }.to match(/[0-9]/)
        wait_for { focus_on(:game).images.count }.to eq(9)
        # binding.pry
      end

      When 'the user submits an answer' do
        focus_on(:game).select_guess_choice('Caroline Wozniacki')
        # binding.pry
      end

      Then 'the user wins the round' do
        wait_for { focus_on(:status).status }.to eq('WINNER')
        wait_for { focus_on(:status).score }.to match(/[0-9]/)
        # binding.pry
      end

      When 'the user starts the next round' do
        focus_on(:game).next_round
      end

      Then 'round two starts' do
        wait_for { focus_on(:status).round }.to eq('2')
        wait_for { focus_on(:status).status }.to eq('IN-PROGRESS')
        wait_for { focus_on(:status).timer }.to match(/[0-9]/)
        wait_for { focus_on(:game).images.count }.to eq(9)
        # binding.pry
      end

      When 'the user submits wrong guess' do
        focus_on(:game).select_guess_choice("Caroline Wozniacki")
        # binding.pry
      end

      Then 'the status stays your guess was WRONG!' do
        wait_for { focus_on(:status).status }.to eq('WRONG')
        # binding.pry
      end

      When 'the user tries again and guesses correctly' do
        focus_on(:game).select_guess_choice("Roger Federer")
        # binding.pry
      end

      Then 'the user wins the round' do
        wait_for { focus_on(:status).status }.to eq('WINNER')
        wait_for { focus_on(:status).score }.to match(/[0-9]/)
        # binding.pry
      end

      When 'the user starts the next round' do
        focus_on(:game).next_round
        # binding.pry
      end

      Then 'Game is finished with a final score' do
        wait_for { focus_on(:results).congratulations }.to eq('Congratulations!')
        wait_for { focus_on(:results).final_score }.to match(/[0-9]/)
      end
    end
  end
end
