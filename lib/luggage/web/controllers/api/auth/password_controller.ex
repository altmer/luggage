defmodule Luggage.Web.PasswordController do
  @moduledoc """
    Password reset and password change controller (without auth)
  """
  use Luggage.Web, :controller

  alias Luggage.Accounts.Passwords

  action_fallback Luggage.Web.FallbackController

  plug :scrub_params, "password_reset" when action in [:create]

  def password_reset(conn, %{"email" => email}) do
    Passwords.send_reset_password_email(email)
    send_resp(conn, 200, "")
  end

  def update(conn, %{"password_reset" => password_params, "jwt" => jwt}) do
    case Passwords.reset_password(jwt, password_params) do
      {:ok, user} ->
        render(conn, Luggage.Web.UserView, "show.json", user: user)
      {:error, :changeset, changeset} ->
        {:error, changeset}
      {:error, :auth, _} ->
        {:error, :forbidden}
    end
  end
end
