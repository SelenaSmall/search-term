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
        binding.pry
        # TODO page fragment
        # TODO make font bigger on the login page
        # TODO auto size the borwser to the right size
        visit("http://localhost:4011/admin")
        binding.pry
        fill_in "Email", with: @user.email
        fill_in "Password", with: @user.password
        binding.pry
        click_on "Sign in"
      end

      Then "He is in the admin dashboard" do
        # TODO why pleas sign in to continue?
        # TODO page fragment
        wait_for { page.find(".flash").text }.to eq "Please sign in to continue."
        binding.pry
      end

      When "He goes to create some new terms" do
        click_on "Terms"
        click_on "New term"
        fill_in "Phrase", with: "Caroline Wozniacki"
        binding.pry
        click_on "Create Term"
        binding.pry

        click_on "Terms"
        click_on "New term"
        fill_in "Phrase", with: "Roger Federer"
        binding.pry
        click_on "Create Term"
        binding.pry
      end

      Then "2 terms are created for 2018 AO winners" do
        click_on "Terms"
        binding.pry
        page.find("table").find_all("tr").map
        wait_for do
          page.find("table").find_all("tr").map { |tr| tr.text }
        end.to include(
                   /Caroline Wozniacki/,
                   /Roger Federer/
               )
        binding.pry
      end
    end
  end
end
