class ApplicationController < ActionController::Base
  include Clearance::Controller
  before_action :pause_execution
  before_action :forced_api_error

  def pause_execution
    return if Rails.env.production?
    return unless defined? Rails.application.config.should_pause

    # pause everything, may want to make this granular per call
    sleep 0.2 while Rails.application.config.should_pause
  end

  def forced_api_error
    return if Rails.env.production?

    raise Rails.application.config.forced_api_error if should_crash?
  end

  def should_crash?
    return unless Rails.application.config.respond_to?(:force_api_error) &&
        Rails.application.config.forced_api_error

    !"options".downcase.casecmp(request.method).zero?
  end
end
