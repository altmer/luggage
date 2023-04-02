defmodule Luggage.Web.UserSocket do
  use Phoenix.Socket
  require Logger

  alias Luggage.Accounts.Sessions

  ## Channels
  channel "post:*", Luggage.Web.PostChannel

  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  def connect(%{"token" => jwt}, socket) do
    with {:ok, user, _jti} <- Sessions.from_token(jwt) do
      {:ok, assign(socket, :current_user, user)}
    else
      {:error, _reason} -> {:error, :unauthorized}
    end
  end
  def connect(params, _socket) do
    Logger.debug fn ->
      "Expected socket params to have a 'token', got: #{inspect params}"
    end
    {:error, :unauthorized}
  end

  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
end
