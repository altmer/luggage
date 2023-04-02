defmodule Luggage.Accounts.User do
  @moduledoc """
    User entity
  """
  use Luggage.Web, :schema
  use Arc.Ecto.Schema

  alias Luggage.Accounts.Avatar
  alias Comeonin.Bcrypt

  schema "users" do
    field :name, :string
    field :email, :string
    field :encrypted_password, :string

    field :bio, :string
    field :locale, :string

    field :avatar, Avatar.Type
    field :crop_x, :string, virtual: true
    field :crop_y, :string, virtual: true
    field :crop_width, :string, virtual: true
    field :crop_height, :string, virtual: true

    field :password, :string, virtual: true
    field :old_password, :string, virtual: true

    field :reset_password_jti, :string

    has_many :posts, Luggage.Blogs.Post

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :email, :encrypted_password, :password, :locale])
    |> validate_required([:name, :email, :password])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "does not match confirmation")
    |> unique_constraint(:email, message: "has already been taken")
    |> generate_encrypted_password
  end

  def upload_avatar(struct, params \\ %{}) do
    struct
    |> cast(params, [:crop_x, :crop_y, :crop_width, :crop_height])
    |> cast_attachments(params, [:avatar], allow_paths: true)
  end

  def update_profile(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :bio])
    |> validate_required([:name])
  end

  def update_password(struct, params \\ %{}) do
    struct
    |> cast(params, [:old_password, :encrypted_password, :password])
    |> validate_current_password(struct.encrypted_password)
    |> validate_confirmation(:password, message: "does not match confirmation")
    |> generate_encrypted_password
  end

  def reset_password(struct, params \\ %{}) do
    struct
    |> cast(params, [:encrypted_password, :password])
    |> validate_confirmation(:password, message: "does not match confirmation")
    |> generate_encrypted_password
  end

  def update_locale(struct, params \\ %{}) do
    struct
    |> cast(params, [:locale])
    |> validate_required([:locale])
  end

  def set_reset_password_jti(struct, params \\ %{}) do
    struct
    |> cast(params, [:reset_password_jti])
    |> validate_required([:reset_password_jti])
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(
          current_changeset,
          :encrypted_password,
          Bcrypt.hashpwsalt(password)
        )
      _ ->
        current_changeset
    end
  end

  defp validate_current_password(current_changeset, encrypted_password) do
    case current_changeset
         |> get_change(:old_password)
         |> Bcrypt.checkpw(encrypted_password) do
      true -> current_changeset
      _ -> add_error(current_changeset, :old_password, "is invalid")
    end
  end
end
