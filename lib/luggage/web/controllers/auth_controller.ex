defmodule Luggage.Web.AuthController do
  use Luggage.Web, :controller

  alias Luggage.Accounts.Omniauth.Google

  plug Ueberauth

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    failure(conn)
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    case auth.provider do
      :google ->
        case Google.sign_in_or_register(auth.info) do
          {:ok, _, jwt} ->
            success(conn, jwt)
          {:error, _} ->
            failure(conn)
        end
    end
  end

  defp failure(conn) do
    redirect(conn, to: "/sessions/auth?result=failure")
  end

  defp success(conn, jwt) do
    redirect(conn, to: "/sessions/auth?result=success&token=#{jwt}")
  end
end
