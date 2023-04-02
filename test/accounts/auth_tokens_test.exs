defmodule Luggage.AuthTokensTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Repo
  alias Luggage.Accounts.{AuthToken, AuthTokens}


  describe "AuthTokens.purge_expired" do
    test "removes expired tokens" do
      user = insert(:user)
      {:ok, _, %{"jti" => jti_expired}} = Guardian.encode_and_sign(user, :token, ttl: {-1, :hours})
      {:ok, _, %{"jti" => jti_valid}} = Guardian.encode_and_sign(user, :token, ttl: {1, :hours})

      assert Repo.get_by(AuthToken, jti: jti_expired)
      assert Repo.get_by(AuthToken, jti: jti_valid)

      AuthTokens.purge_expired

      refute Repo.get_by(AuthToken, jti: jti_expired)
      assert Repo.get_by(AuthToken, jti: jti_valid)
    end
  end
end
