class Api::V1::RoundsController < ApplicationController
  def show
    term = Term.first

    render json: { term: term.phrase }
  end
end
