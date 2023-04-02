defmodule Luggage.Web.RegistrationControllerTest do
  use Luggage.Web.ConnCase

  alias Luggage.Accounts.User

  @valid_attrs %{
                  email: "test@mail.test",
                  password: "12345678",
                  password_confirmation: "12345678",
                  name: "Ada Lovelace"
                }
  @invalid_attrs %{
                  email: "test@mail.test",
                  password: "12345678",
                  password_confirmation: "12345678",
                }

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  # POST :create
  test "creates new user and returns auth token and new user data when params are valid", %{conn: conn} do
    conn = post conn, registration_path(conn, :create), user: @valid_attrs

    result = json_response(conn, 201)
    assert result

    new_user = Repo.get_by(User, %{name: "Ada Lovelace"})
    assert result["user"]["id"] == new_user.id

    # check jwt token validity
    {:ok, claims} = Guardian.decode_and_verify(result["jwt"])
    {:ok, ^new_user} = Guardian.serializer.from_token(claims["sub"])
  end

  test "returns 422 error when params are invalid", %{conn: conn} do
    conn = post conn, registration_path(conn, :create), user: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end
end
