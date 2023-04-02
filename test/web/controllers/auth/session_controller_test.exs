defmodule Luggage.Web.SessionControllerTest do
  use Luggage.Web.ConnCase

  import Luggage.Factory

  alias Luggage.Accounts.User

  describe "POST :create" do
    test "returns jwt token when email and password are valid", %{conn: conn} do
      user = insert(:user)
      conn = post conn, session_path(conn, :create), session: %{email: user.email, password: "12345678"}

      result = json_response(conn, 201)
      assert result
      assert result["user"]["id"] == user.id
      assert result["user"]["locale"] == "en"
      assert result["user"]["color"]
      assert result["user"]["initials"]

      saved_user = Repo.get!(User, user.id)

      # check jwt token validity
      {:ok, claims} = Guardian.decode_and_verify(result["jwt"])
      {:ok, ^saved_user} = Guardian.serializer.from_token(claims["sub"])
    end

    test "returns success when email and password are valid and email is written in caps", %{conn: conn} do
      user = insert(:user)
      conn = post conn, session_path(conn, :create), session: %{email: String.upcase(user.email), password: "12345678"}

      assert json_response(conn, 201)
    end

    test "returns 422 error when password is invalid", %{conn: conn} do
      user = insert(:user)
      conn = post conn, session_path(conn, :create), session: %{email: user.email, password: "12345679"}
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "returns 422 error when email is missing", %{conn: conn} do
      conn = post conn, session_path(conn, :create), session: %{email: nil, password: "12345678"}
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "DELETE :delete" do
    @tag :login
    test "invalidates token when user is authenticated", %{conn: conn} do
      # make sure claims exist
      token = Guardian.Plug.current_token(conn)
      {:ok, _} = Guardian.decode_and_verify(token)
      delete conn, session_path(conn, :delete)
      {:error, :token_not_found} = Guardian.decode_and_verify(token)
    end

    test "returns 422 error when no session", %{conn: conn} do
      conn = delete conn, session_path(conn, :delete)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "PUT :update_locale" do
    @tag :login
    test "allows logged user to edit her locale", %{conn: conn, logged_user: user} do
      conn = put conn, "/api/sessions/locale", locale: "de"
      assert json_response(conn, 200)["locale"] == "de"

      updated_user = Repo.get!(User, user.id)
      assert updated_user.locale == "de"
    end
  end
end
