class MatchesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    matches = Match.all
    render json: matches
  end

  def create
    match = Match.new(match_params)
    if match.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          MatchSerializer.new(match)
      ).serializable_hash
      # ActionCable.server.broadcast 'matches_channel', serialized_data
      # head :ok
      render json: serialized_data
    end
  end

  private

  def match_params
    params.require(:match).permit(:title)
  end
end
