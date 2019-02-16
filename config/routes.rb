Rails.application.routes.draw do
  namespace :admin do
      resources :games
      resources :terms

      root to: "games#index"
    end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :rounds, only: [:show]
      resources :games, only: [:index, :show]
    end
  end

  # action cable for matches with plays
  resources :matches, only: [:index, :create]
  resources :plays, only: [:create]
  mount ActionCable.server => '/cable'
end
