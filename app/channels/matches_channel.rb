class MatchesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "matches_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
