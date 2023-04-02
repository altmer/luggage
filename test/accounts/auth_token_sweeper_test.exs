defmodule Luggage.AuthTokenSweeperTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Repo
  alias Luggage.Accounts.{AuthToken, AuthTokenSweeper}

  describe "AuthTokenSweeper.purge/1" do
    test "removes expired tokens" do
      user = insert(:user)
      {:ok, _, %{"jti" => jti_expired}} = Guardian.encode_and_sign(user, :token, ttl: {-1, :hours})
      {:ok, _, %{"jti" => jti_valid}} = Guardian.encode_and_sign(user, :token, ttl: {1, :hours})

      assert Repo.get_by(AuthToken, jti: jti_expired)
      assert Repo.get_by(AuthToken, jti: jti_valid)

      AuthTokenSweeper.purge

      refute Repo.get_by(AuthToken, jti: jti_expired)
      assert Repo.get_by(AuthToken, jti: jti_valid)
    end
  end
end
