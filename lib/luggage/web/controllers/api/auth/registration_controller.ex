defmodule Luggage.Web.RegistrationController do
  use Luggage.Web, :controller

  alias Luggage.Accounts.{Sessions, Users}

  action_fallback Luggage.Web.FallbackController

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    case Users.add(user_params) do
      {:ok, %{user: user}} ->
        {:ok, user, jwt} = Sessions.gen_token(user)
        conn
        |> put_status(:created)
        |> render(Luggage.Web.SessionView, "show.json", jwt: jwt, user: user)
      {:error, _entity, changeset, _changes_so_far} ->
        {:error, changeset}
    end
  end
end
