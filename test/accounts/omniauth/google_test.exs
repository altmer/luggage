defmodule Luggage.GoogleTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Accounts.GuardianSerializer
  alias Luggage.Accounts.Omniauth.Google

  describe "Google.sign_in_or_register" do
    test "it generates token for exisiting user if user is found" do
      user = insert(:user)
      assert {:ok, auth_user, jwt} = Google.sign_in_or_register(%{email: user.email})
      assert auth_user.id == user.id

      {:ok, %{"sub" => sub}} = Guardian.decode_and_verify(jwt)
      assert {:ok, ^auth_user} = GuardianSerializer.from_token(sub)
    end

    test "it returns error in case of invalida data in auth params" do
      assert {:error, _} = Google.sign_in_or_register(
        %{
          first_name: nil,
          last_name: nil,
          email: "someemail@mail.test",
          image: nil
        }
      )
    end

    test "it registers new user if data is valid" do
      assert {:ok, user, jwt} = Google.sign_in_or_register(
        %{
          first_name: "Alex",
          last_name: "Kummer",
          email: "someemail@mail.test",
          image: nil
        }
      )

      assert "someemail@mail.test" == user.email
      assert "Alex Kummer" == user.name

      {:ok, %{"sub" => sub}} = Guardian.decode_and_verify(jwt)
      assert {:ok, auth_user} = GuardianSerializer.from_token(sub)
      assert auth_user.id == user.id
    end
  end
end
