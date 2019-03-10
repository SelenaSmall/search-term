module PageFragments
  module Landing
    def on_landing
      browser.current_path == '/'
    end
  end
end
