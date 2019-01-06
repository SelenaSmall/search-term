module Api
  module V1
    class RoundsController < ApplicationController
      def show
        term   = Game.find(params[:gameName]).get_term_for_round(params[:id].to_i)

        images = ImageSearchService
                 .new(search_term: term.phrase)
                 .call
                 .sample(9)
                 .each_with_index
                 .map { |image, index| { id: index, src: image } }

        render json: { term: term.phrase, images: images }
      end
    end
  end
end
