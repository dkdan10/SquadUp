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

    resources :events, only: [:destroy, :show, :index, :create, :update]

    # Think about nesting events index under users or groups to get a groups/users events
    # instead of using filters. 
  end

end
 