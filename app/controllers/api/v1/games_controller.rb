class Api::V1::GamesController < ApplicationController
  def index
    game = Game.first

    render json: { rounds: game.rounds }
  end
end
