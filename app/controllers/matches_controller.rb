class MatchesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    matches = Match.all
    render json: matches
  end

  def create
    match = Match.new(match_params)
    if match.save!
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          MatchSerializer.new(match)
      ).serializable_hash
      # ActionCable.server.broadcast 'matches_channel', serialized_data
      # head :ok
      render json: serialized_data
    else
      render json: match.errors
    end
  end

  def join
    match = Match.find(params.permit(:id)[:id])
    player = Player.find(params[:player_id])
    match.players << player unless match.players.exists?(player.id)
    serialized_data = ActiveModelSerializers::Adapter::Json.new(
      # TODO hack not even saving the play just creating it to serialize and it should really be a separate channel of players joining?
      PlaySerializer.new(Play.new(match: match, text: "NEW PLAYER #{player.id}"))
    ).serializable_hash
    PlaysChannel.broadcast_to match, serialized_data
    head :ok
  end

  def players
    match = Match.find(params.permit(:id)[:id])
    render json: match.players
  end

  def results
    match = Match.find(params.permit(:id)[:id])
    render json: match.players
  end

  def start
    match = Match.find(params[:id])
    serialized_data = ActiveModelSerializers::Adapter::Json.new(
      # TODO hack not even saving the play just creating it to serialize and it should really be a separate channel of players joining?
      PlaySerializer.new(Play.new(match: match, text: "START MATCH"))
    ).serializable_hash
    if match.player
      PlaysChannel.broadcast_to match, serialized_data
      render json: match.player
    else
      match.player = Player.find(params[:player_id])
      if match.save!
    PlaysChannel.broadcast_to match, serialized_data
        render json: match.player
      else
        render json: match.error
      end
    end
  end

  def commanding_player
    match = Match.find(params[:id])
    render json: match.player
  end

  private

  def match_params
    params.require(:match).permit(:title)
  end
end
