defmodule Luggage.GuardianSerializerTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Accounts.{AuthToken, GuardianSerializer, User}

  describe "GuardianSerializer.for_token/1" do
    test "it returns string with user id when User struct is provided" do
      assert {:ok, "User:42"} = GuardianSerializer.for_token(%User{id: 42})
    end

    test "it returns error for any other struct" do
      assert {:error, "Unknown resource type"} = GuardianSerializer.for_token(%AuthToken{id: 42})
    end
  end

  describe "GuardianSerializer.from_token/1" do
    test "it returns user struct when correct string given" do
      user = insert(:user)
      token = "User:#{user.id}"
      assert {:ok, found_user} = GuardianSerializer.from_token(token)
      assert user.id == found_user.id
    end

    test "it returns error for any other string type" do
      assert {:error, "Unknown resource type"} = GuardianSerializer.from_token("Customer:1")
    end
  end
end
