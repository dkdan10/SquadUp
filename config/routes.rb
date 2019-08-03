Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create, :show]
    resource :session, only: [:create, :destroy]
    resources :locations, only: [:index]

    resources :groups, only: [:index, :create, :show, :destroy, :update]
    post 'groups/add_member/:id', to: 'groups#create_member'
    delete 'groups/remove_member/:id', to: 'groups#destroy_member'
  end

end
 