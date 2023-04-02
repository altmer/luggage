defmodule Luggage.Accounts.Passwords do
  @moduledoc """
    Accounts helper functions
  """
  alias Luggage.Emails
  alias Luggage.Accounts.{Sessions, Users}
  alias Luggage.Emails.Mailer
  alias Luggage.Web.Endpoint

  def send_reset_password_email(email) do
    email
    |> Users.get_by_email()
    |> generate_reset_token()
    |> set_reset_token()
    |> do_send_reset_password_email()
  end

  def generate_reset_token(nil),
    do: {:error, :not_found}

  def generate_reset_token(user) do
    {:ok, jwt, %{"jti" => jti}} = Guardian.encode_and_sign(
      user, :token, ttl: {1, :hours}
    )
    %{user: user, jwt: jwt, jti: jti}
  end

  def set_reset_token({:error, reason}),
    do: {:error, reason}

  def set_reset_token(%{user: user, jwt: jwt, jti: jti}) do
    {:ok, user} = Users.set_reset_token(user, jti)
    %{user: user, jwt: jwt}
  end

  def do_send_reset_password_email({:error, reason}),
    do: {:error, reason}

  def do_send_reset_password_email(%{user: user, jwt: jwt}) do
    Mailer.deliver_later(
      Emails.reset_password_email(
        user.email,
        user.name,
        reset_password_link(jwt),
        user.locale
      )
    )
    {:ok, user}
  end

  def reset_password_link(jwt) do
    "#{Endpoint.url}/password/reset/#{jwt}"
  end

  def reset_password(jwt, password_params) do
    with {:ok, user, jti} <- Sessions.from_token(jwt),
         true <- jti == user.reset_password_jti,
         {:ok, user} <- Users.reset_password(user, password_params) do
      Guardian.revoke!(jwt)
      {:ok, user}
    else
      false -> {:error, :auth, :invalid_token}
      {:error, %Ecto.Changeset{} = changeset} -> {:error, :changeset, changeset}
      {:error, reason} -> {:error, :auth, reason}
    end
  end
end
