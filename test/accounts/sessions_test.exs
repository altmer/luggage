defmodule Luggage.SessionsTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Repo
  alias Luggage.Accounts.{AuthToken, GuardianSerializer, Sessions}

  describe "Sessions.authenticate/1" do
    test "it returns failed auth when given email is nil" do
      assert {:error, :auth_failed} = Sessions.authenticate(%{"email" => nil, "password" => "1232"})
    end

    test "it returns failed auth when given email is empty" do
      assert {:error, :auth_failed} = Sessions.authenticate(%{"email" => "", "password" => "1232"})
    end

    test "it returns failed auth when there is no user with given email" do
      insert(:user)
      assert {:error, :auth_failed} = Sessions.authenticate(
        %{"email" => "some@email.com", "password" => "12345678"}
      )
    end

    test "it returns failed auth when password is incorrect" do
      user = insert(:user)
      assert {:error, :auth_failed} = Sessions.authenticate(
        %{"email" => user.email, "password" => "123456789"}
      )
    end

    test "it returns ok with user and token when auth succeeded" do
      user = insert(:user)
      assert {:ok, auth_user, jwt} = Sessions.authenticate(
        %{"email" => user.email, "password" => "12345678"}
      )

      assert auth_user.id == user.id

      {
        :ok,
        %{"sub" => sub}
      } = Guardian.decode_and_verify(jwt)

      assert {:ok, token_user} = GuardianSerializer.from_token(sub)
      assert token_user.id == user.id
    end
  end

  describe "Sessions.from_token/1" do
    test "it returns user if it still exists" do
      user = insert(:user)
      {:ok, jwt, _} = Guardian.encode_and_sign(
        user, :token, ttl: {1, :hours}
      )

      assert {:ok, token_user, _} = Sessions.from_token(jwt)
      assert token_user.id == user.id
    end

    test "it returns error if token is not in DB" do
      user = insert(:user)
      {:ok, jwt, _} = Guardian.encode_and_sign(
        user, :token, ttl: {1, :hours}
      )

      Repo.delete_all(AuthToken)

      assert {:error, :token_not_found} = Sessions.from_token(jwt)
    end
  end

  describe "Sessions.gen_token/1" do
    test "it returns error if user is nil" do
      assert {:error, :auth_failed} = Sessions.gen_token(nil)
    end

    test "it returns user and correct jwt token for existing user" do
      user = insert(:user)
      assert {:ok, auth_user, jwt} = Sessions.gen_token(user)
      assert {:ok, token_user, _} = Sessions.from_token(jwt)

      assert auth_user.id == user.id
      assert token_user.id == user.id
    end
  end
end
