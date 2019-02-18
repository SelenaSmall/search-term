class PlaysController < ApplicationController
  def create
    Rails.logger.warn(params)
    play = Play.new(play_params)
    match = Match.find(play_params[:match_id])
    if play.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PlaySerializer.new(play)
      ).serializable_hash
      PlaysChannel.broadcast_to match, serialized_data
      head :ok
    end
  end

  private


  def play_params
    params.require(:play).permit(:text, :match_id)
  end
end
