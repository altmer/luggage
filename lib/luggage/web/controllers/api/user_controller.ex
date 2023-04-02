defmodule Luggage.Web.UserController do
  use Luggage.Web, :controller

  alias Luggage.Accounts.{User, Users}

  require Logger

  action_fallback Luggage.Web.FallbackController

  plug :scrub_params, "user" when action in [
    :update, :upload_avatar, :update_password
  ]
  plug Guardian.Plug.EnsureAuthenticated,
    %{handler: Luggage.Web.SessionController} when action in [
      :current, :update, :avatar, :update_password
    ]

  def current(conn, _) do
    render(conn, "user_badge.json", user: current_user(conn))
  end

  def show(conn, %{"id" => id}) do
    render(conn, "show.json", user: Users.get!(id))
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    with user <- Repo.get!(User, id),
         true <- authorized_to_edit?(conn, user),
         {:ok, user} <- Users.update_profile(user, user_params) do
      render(conn, "show.json", user: user)
    else
      false ->
        {:error, :forbidden}
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def upload_avatar(conn, %{"id" => id, "user" => user_params}) do
    with user <- Repo.get!(User, id),
         true <- authorized_to_edit?(conn, user),
         {:ok, user} <- Users.upload_avatar(user, user_params) do
      render(conn, "show.json", user: user)
    else
      false ->
        {:error, :forbidden}
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def update_password(conn, %{"id" => id, "user" => user_params}) do
    with user <- Repo.get!(User, id),
         true <- authorized_to_edit?(conn, user),
         {:ok, user} <- Users.update_password(user, user_params) do
      render(conn, "show.json", user: user)
    else
      false ->
        {:error, :forbidden}
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  defp authorized_to_edit?(conn, edited_user),
    do: edited_user.id == current_user(conn).id
end
