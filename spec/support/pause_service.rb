module PauseService
  def with_api_route_paused
    Rails.application.config.should_pause = true
    yield
  ensure
    Rails.application.config.should_pause = nil
  end
end
