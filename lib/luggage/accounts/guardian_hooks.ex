defmodule Luggage.Accounts.GuardianHooks do
  @moduledoc """
    Hooks on guardian methods to check token in DB
  """
  use Guardian.Hooks
  alias Luggage.Repo
  alias Luggage.Accounts.AuthToken

  def after_encode_and_sign(resource, _, claims, token) do
    jti = Map.get(claims, "jti")
    aud = Map.get(claims, "aud")
    exp = Map.get(claims, "exp")
    Repo.insert!(%AuthToken{
      user_id: resource.id,
      jwt: token,
      jti: jti,
      aud: aud,
      exp: exp
    })
    {:ok, {claims, token}}
  end

  def on_revoke(claims, jwt) do
    jti = Map.get(claims, "jti")
    aud = Map.get(claims, "aud")
    token = Repo.get_by!(AuthToken, %{jti: jti, aud: aud})
    Repo.delete!(token)
    {:ok, {claims, jwt}}
  end

  def on_verify(claims, jwt) do
    jti = Map.get(claims, "jti")
    aud = Map.get(claims, "aud")
    case Repo.get_by(AuthToken, %{jti: jti, aud: aud}) do
      nil -> {:error, :token_not_found}
      _ -> {:ok, {claims, jwt}}
    end
  end
end
