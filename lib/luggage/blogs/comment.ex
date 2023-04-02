defmodule Luggage.Blogs.Comment do
  @moduledoc """
    Comment entity, represents comment under blog post
  """
  use Luggage.Web, :schema

  schema "comments" do
    field :text, :string

    belongs_to :user, Luggage.Accounts.User
    belongs_to :post, Luggage.Blogs.Post

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:text, :user_id, :post_id])
    |> validate_required([:text, :user_id, :post_id])
  end
end
