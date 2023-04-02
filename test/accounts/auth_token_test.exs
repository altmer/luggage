defmodule Luggage.AuthTokenTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Accounts.AuthToken

  @valid_attrs %{
                  jwt: "jwt",
                  jti: "jti",
                  aud: "aud",
                  exp: 234423221,
                }
  @empty_attrs %{}

  test "changeset with empty attributes" do
    changeset = AuthToken.changeset(%AuthToken{}, @empty_attrs)
    refute changeset.valid?
  end

  test "changeset with valid attributes" do
    user = insert(:user)
    changeset = AuthToken.changeset(
      %AuthToken{},
      Map.merge(@valid_attrs, %{user_id: user.id})
    )
    assert changeset.valid?
  end
end
