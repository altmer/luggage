defmodule Luggage.Web.PasswordControllerTest do
  use Luggage.Web.ConnCase
  use Bamboo.Test

  import Luggage.Factory

  alias Luggage.Accounts.{User, Users}

  describe "POST :password_reset" do
    test "send reset password email if user is found", %{conn: conn} do
      user = insert(:user)
      conn = post conn, password_path(conn, :password_reset), email: user.email

      assert conn.status == 200

      assert_delivered_with(
        to: [{user.name, user.email}],
        subject: "Password reset"
      )
      user = Repo.get(User, user.id)
      assert user.reset_password_jti != nil
    end

    test "silently does nothing if user is not found", %{conn: conn} do
      conn = post conn, password_path(conn, :password_reset), email: "dd@dd.de"
      assert conn.status == 200
      assert_no_emails_delivered()
    end
  end

  describe "POST :update" do
    @valid_password_params %{
      password: "new_password",
      password_confirmation: "new_password"
    }
    @wrong_password_confirmation %{
      password: "new_password",
      password_confirmation: "new_password2"
    }

    test "returns forbidden status if token is invalid", %{conn: conn} do
      user = insert(:user)
      {:ok, jwt, _} = Guardian.encode_and_sign(user, :token, ttl: {-1, :hours})
      conn = post conn, password_path(conn, :update), %{
        jwt: jwt, password_reset: @valid_password_params
      }

      assert json_response(conn, 403)["error"]

      user = Repo.get(User, user.id)
      refute Comeonin.Bcrypt.checkpw("new_password", user.encrypted_password)
    end

    test "returns unprocessable_entity if params are invalid", %{conn: conn} do
      user = insert(:user)

      {:ok, jwt, %{"jti" => jti}} = Guardian.encode_and_sign(user, :token, ttl: {1, :hours})
      {:ok, user} = Users.set_reset_token(user, jti)

      conn = post conn, password_path(conn, :update), %{
        jwt: jwt, password_reset: @wrong_password_confirmation
      }

      assert json_response(conn, 422)["errors"]

      user = Repo.get(User, user.id)
      refute Comeonin.Bcrypt.checkpw("new_password", user.encrypted_password)
    end

    test "updates password", %{conn: conn} do
      user = insert(:user)
      refute Comeonin.Bcrypt.checkpw("new_password", user.encrypted_password)

      {:ok, jwt, %{"jti" => jti}} = Guardian.encode_and_sign(user, :token, ttl: {1, :hours})
      {:ok, user} = Users.set_reset_token(user, jti)

      conn = post conn, password_path(conn, :update), %{
        jwt: jwt, password_reset: @valid_password_params
      }

      json = json_response(conn, 200)
      assert json["id"] == user.id

      user = Repo.get(User, user.id)
      assert Comeonin.Bcrypt.checkpw("new_password", user.encrypted_password)
    end
  end
end
