defmodule Luggage.UsersTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Comeonin.Bcrypt
  alias Luggage.Accounts.Users

  describe "Users.get!/1" do
    test "it returns user by id" do
      user = insert(:user)
      found_user = Users.get!(user.id)
      assert found_user.id == user.id
    end
  end

  describe "Users.get_by_email/1" do
    test "it returns nil when nil email given" do
      refute Users.get_by_email(nil)
    end

    test "it returns nil when empty email given" do
      insert(:user)
      refute Users.get_by_email("")
    end

    test "it returns nil when incorrect email given" do
      insert(:user)
      refute Users.get_by_email("somerandomemail@mail.com")
    end

    test "it returns user when correct email given" do
      user = insert(:user)
      found_user = Users.get_by_email(user.email)
      assert found_user.id == user.id
    end
  end

  describe "Users.add/1" do
    test "it create user with default locale if params are valid" do
      assert {:ok, %{user: user}} = Users.add(%{
          "email" => "test@mail.test",
          "password" => "12345678",
          "password_confirmation" => "12345678",
          "name" => "Ada Lovelace",
          "locale" => "de"
        }
      )

      assert "Ada Lovelace" == user.name
      assert "en" == user.locale
    end

    test "it returns validation error if params are invalid" do
      assert {:error, _, _, _} = Users.add(%{
          "password" => "12345678",
          "password_confirmation" => "12345678",
          "name" => "Ada Lovelace",
          "locale" => "de"
        }
      )
    end
  end

  describe "Users.update_profile/2" do
    test "it updates user and returns it if params are valid" do
      user = insert(:user)
      assert {:ok, updated_user} = Users.update_profile(user, %{
        "name" => "Dart Vader", "bio" => "Dark sith, formerly Anakin Skywalker"
      })
      assert user.id == updated_user.id
      assert "Dart Vader" == updated_user.name
      assert "Dark sith, formerly Anakin Skywalker" == updated_user.bio
    end

    test "it returns error if params are invalid" do
      user = insert(:user)
      assert {:error, _} = Users.update_profile(user, %{
        "name" => "",
        "bio" => "shady"
      })
    end
  end

  describe "Users.update_password/2" do
    test "it updates user password if params are valid" do
      user = insert(:user)
      assert {:ok, updated_user} = Users.update_password(user, %{
        "old_password" => "12345678",
        "password" => "strong_password",
        "password_confirmation" => "strong_password"
      })
      assert user.id == updated_user.id
      assert Bcrypt.checkpw("strong_password", updated_user.encrypted_password)
    end

    test "it does not update user password if old password is not valid" do
      user = insert(:user)
      assert {:error, _} = Users.update_password(user, %{
        "old_password" => "123456789",
        "password" => "strong_password",
        "password_confirmation" => "strong_password"
      })
      updated_user = Users.get!(user.id)
      refute Bcrypt.checkpw("strong_password", updated_user.encrypted_password)
    end

    test "it does not update user password if confirmation does not match" do
      user = insert(:user)
      assert {:error, _} = Users.update_password(user, %{
        "old_password" => "12345678",
        "password" => "strong_password",
        "password_confirmation" => "strong_password2"
      })
      updated_user = Users.get!(user.id)
      refute Bcrypt.checkpw("strong_password", updated_user.encrypted_password)
    end
  end

  describe "Users.reset_password/2" do
    test "it updates user password if params are valid" do
      user = insert(:user)
      assert {:ok, updated_user} = Users.reset_password(user, %{
        "password" => "strong_password",
        "password_confirmation" => "strong_password"
      })
      assert user.id == updated_user.id
      assert Bcrypt.checkpw("strong_password", updated_user.encrypted_password)
    end

    test "it does not update user password if confirmation does not match" do
      user = insert(:user)
      assert {:error, _} = Users.reset_password(user, %{
        "password" => "strong_password",
        "password_confirmation" => "strong_password2"
      })
      updated_user = Users.get!(user.id)
      refute Bcrypt.checkpw("strong_password", updated_user.encrypted_password)
    end
  end

  describe "Users.set_reset_token/2" do
    test "it updates user password reset token if provided" do
      user = insert(:user)
      assert {:ok, updated_user} = Users.set_reset_token(user, "new_token")
      assert user.id == updated_user.id
      assert "new_token" == updated_user.reset_password_jti
    end

    test "it does not update user password reset token if blank" do
      user = insert(:user)
      assert {:error, _} = Users.set_reset_token(user, "")
      updated_user = Users.get!(user.id)
      refute "new_token" == updated_user.reset_password_jti
    end
  end

  describe "Users.update_locae/2" do
    test "it updates user locale if provided" do
      user = insert(:user)
      assert {:ok, updated_user} = Users.update_locale(user, %{"locale" => "de"})
      assert user.id == updated_user.id
      assert "de" == updated_user.locale
    end

    test "it does not update user locale if blank" do
      user = insert(:user)
      assert {:error, _} = Users.update_locale(user, %{"locale" => ""})
      updated_user = Users.get!(user.id)
      refute "de" == updated_user.locale
    end
  end
end
