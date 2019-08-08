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
    get 'current_user/groups/events', to: 'events#current_user_group_events'
    post 'events/add_rsvp/:id', to: 'events#add_rsvp'
    delete 'events/remove_rsvp/:id', to: 'events#remove_rsvp'

    get 'current_user', to: 'users#send_current_user'

    # Websockets
    mount ActionCable.server, at: '/cable'
    
  end

end
 