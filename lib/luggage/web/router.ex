defmodule Luggage.Web.Router do
  use Luggage.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]

    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource

    plug Luggage.Plugs.Locale, "en"
  end

  scope "/api", Luggage.Web do
    pipe_through :api

    # auth flow
    resources "/registrations", RegistrationController, only: [:create]
    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    put "/sessions/locale", SessionController, :update_locale
    get "/current_user", UserController, :current
    post "/passwords", PasswordController, :update
    post "/passwords/reset", PasswordController, :password_reset

    # app
    resources "/posts", PostController
    resources "/comments", CommentController, only: [:index]

    scope "/users" do
      put "/:id/avatar", UserController, :upload_avatar
      put "/:id/update_password", UserController, :update_password
    end
    resources "/users", UserController, only: [:show, :update]
  end

  # these paths are for oauth only - überauth works with browser pipeline
  scope "/auth", Luggage.Web do
    pipe_through :browser

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  scope "/", Luggage.Web do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end
end
