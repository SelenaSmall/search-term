module Api
  module V1
    class RoundsController < ApplicationController
      def show
        game = Game.find(params[:gameName])
        term   = game.get_term_for_round(params[:id].to_i)
        multi_choice = game.find_multi_choice(term)

        images = ImageSearchService
                 .new(search_term: term.phrase)
                 .call
                 .sample(9)
                 .each_with_index
                 .map { |image, index| { id: index, src: image } }

        render json: { term: term.phrase, images: images, terms: multi_choice, rounds: game.rounds }
      end
    end
  end
end
