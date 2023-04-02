defmodule Luggage.Accounts.AuthToken do
  @moduledoc """
    Module for storing auth tokens in database (to control their expiration)
  """
  use Luggage.Web, :schema

  schema "auth_tokens" do
    field :jwt, :string
    field :jti, :string
    field :aud, :string
    field :exp, :integer

    belongs_to :user, Luggage.Accounts.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:jwt, :jti, :aud, :exp, :user_id])
    |> validate_required([:jwt, :jti, :aud, :exp, :user_id])
  end
end
