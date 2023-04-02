defmodule Luggage.Web.SessionController do
  @moduledoc """
    Sign in and sign out controller
  """
  use Luggage.Web, :controller

  alias Luggage.Accounts.{Sessions, Users}
  alias Guardian.Plug, as: GuardianPlug

  action_fallback Luggage.Web.FallbackController

  plug :scrub_params, "session" when action in [:create]
  plug Guardian.Plug.EnsureAuthenticated,
    %{handler: Luggage.Web.SessionController} when action in [:update_locale]

  def create(conn, %{"session" => session_params}) do
    case Sessions.authenticate(session_params) do
      {:ok, user, jwt} ->
        conn
        |> put_status(:created)
        |> render("show.json", jwt: jwt, user: user)
      {:error, _} ->
        {:error, :wrong_authentication}
    end
  end

  def delete(conn, _) do
    case GuardianPlug.claims(conn) do
      {:ok, claims} ->
        conn
        |> GuardianPlug.current_token
        |> Guardian.revoke!(claims)

        render(conn, "delete.json")
      {:error, :no_session} ->
        {:error, :wrong_authentication}
    end
  end

  def update_locale(conn, params) do
    case Users.update_locale(current_user(conn), params) do
      {:ok, user} ->
        render(conn, "locale.json", user: user)
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def unauthenticated(conn, _) do
    conn
    |> put_status(:forbidden)
    |> render(Luggage.Web.SessionView, "forbidden.json", error: "Not Authenticated")
  end
end
