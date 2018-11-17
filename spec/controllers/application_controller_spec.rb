require 'rails_helper'

class SubclassOfApplicationController < ApplicationController
  def index
    render plain: 'done'
  end
end

RSpec.describe SubclassOfApplicationController, type: :controller do
  before do
    Rails.application.routes.draw do
      get "index" => "subclass_of_application#index"
    end
  end

  after do
    Rails.application.reload_routes!
  end

  it 'passes through if no Rails.applicaton.config.should_pause' do
    get :index
    expect(response.code).to eq '200'
  end

  it 'pauses if Rails.application.config.should_pause' do
    expect(Rails.application.config).to receive(:should_pause).and_return(true)
    # on subsequent calls return false to not sleep forever
    expect(Rails.application.config).to receive(:should_pause).and_return(false)
    # TODO check that sleep gets called
    # expect(ApplicationController).to receive(:sleep).with(0.2)
    get :index
    expect(response.code).to eq '200'
  end

  it 'does NOT pauses if NOT Rails.application.config.should_pause' do
    expect(Rails.application.config).to receive(:should_pause).and_return(false)
    expect(Kernel).not_to receive(:sleep)
    get :index
    expect(response.code).to eq '200'
  end
end
