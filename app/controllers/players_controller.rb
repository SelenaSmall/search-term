class PlayersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    player = Player.find(params[:id])
    render json: player
  end

  def create
    player = Player.new()
    if player.save!
      render json: player
    end
  end

  def first_or_create
    player = Player.where(id: params[:id]).first_or_create
    render json: player
  end

  private

end
