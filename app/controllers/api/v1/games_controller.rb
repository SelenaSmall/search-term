module Api
  module V1
    class GamesController < ApplicationController
      def index
        games = Game.where(state: :published).  all

        render json: { games: games || [] }
      end

      def show
        game = Game.find(params[:id])

        render json: { rounds: game&.rounds || 0 }
      end
    end
  end
end
