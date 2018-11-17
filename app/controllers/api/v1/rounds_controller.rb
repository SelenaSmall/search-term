module Api
  module V1
    class RoundsController < ApplicationController
      def show
        term   = Term.get_term(params[:id])
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
