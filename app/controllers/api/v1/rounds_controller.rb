class Api::V1::RoundsController < ApplicationController
  def show
    term = Term.first
    images = ImageSearchService
                 .new(search_term: term.phrase)
                 .call
                 .shuffle
                 .first(9)
                 .each_with_index
                 .map { |image, index| { id: index, src: image } }

    render json: { term: term.phrase, images: images }
  end
end
