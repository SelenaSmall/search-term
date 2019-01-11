module ForceApiError
  def self.force(error_message)
    Rails.application.config.force_api_error = error_message
  end

  def self.clear
    Rails.application.config.force_api_error = nil
  end
end
