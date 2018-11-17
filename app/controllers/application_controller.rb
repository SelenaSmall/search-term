class ApplicationController < ActionController::Base
  before_action :pause_execution

  def pause_execution
    return if Rails.env.production?
    return unless defined? Rails.application.config.should_pause

    # pause everything, may want to make this granular per call
    sleep 0.2 while Rails.application.config.should_pause
  end
end
