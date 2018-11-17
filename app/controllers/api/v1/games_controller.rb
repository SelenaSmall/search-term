module Api
  module V1
    class GamesController < ApplicationController
      def index
        game = Game.first

        render json: { rounds: game&.rounds || 0 }
      end
    end
  end
end
