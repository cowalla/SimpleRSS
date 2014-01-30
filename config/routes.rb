SRSS::Application.routes.draw do
  resources :feeds, only: [:index, :create, :show] do
    resources :entries, only: [:show, :index]
  end
  resource :session
  resources :users

  root to: "feeds#index"
end
