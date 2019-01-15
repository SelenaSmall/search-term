module Api
  module V1
    class GamesController < ApplicationController
      def index
        games = Game.where(state: :published)

        render json: { games: games || [] }
      end

      def show
        game = Game.find(params[:id])

        render json: game.slice(:rounds, :game_style)
      end
    end
  end
end
