defmodule Luggage.Accounts.Omniauth.Google do
  @moduledoc """
    Functions for processing result of Google authentication.
  """
  alias Luggage.Accounts.{Sessions, Users}

  def sign_in_or_register(auth_info) do
    %{email: email} = auth_info

    email
    |> Users.get_by_email
    |> register_user_if_needed(auth_info)
    |> generate_token()
  end

  defp register_user_if_needed(nil, %{
    first_name: first_name, last_name: last_name, email: email, image: image_url
  }) do
    pass = SecureRandom.base64(16)
    Users.add(
      %{
        "name" => String.trim("#{first_name} #{last_name}"),
        "email" => email,
        "password" => pass,
        "password_confirmation" => pass,
        "avatar" => image_url
      }
    )
  end
  defp register_user_if_needed(user, _) when user != nil do
    {:ok, %{user: user}}
  end

  defp generate_token({:error, _entity, changeset, _changes_so_far}) do
    {:error, changeset}
  end
  defp generate_token({:ok, %{user: user}}) do
    Sessions.gen_token(user)
  end
end
