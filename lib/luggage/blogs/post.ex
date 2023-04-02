defmodule Luggage.Blogs.Post do
  @moduledoc """
    Post model
  """
  use Luggage.Web, :schema

  schema "posts" do
    field :title, :string
    field :body, :string

    belongs_to :user, Luggage.Accounts.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :body, :user_id])
    |> validate_required([:title, :body, :user_id])
  end

  def update(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :body])
    |> validate_required([:title, :body])
  end
end
