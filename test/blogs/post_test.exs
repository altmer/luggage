defmodule Luggage.PostTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Blogs.Post

  setup do
    user = insert(:user)

    {:ok, %{user: user}}
  end

  @valid_attrs %{body: "some body", title: "post title"}
  @missing_body_attrs %{title: "some title"}

  test "changeset with valid attributes", %{user: user} do
    attrs = @valid_attrs |> Map.put(:user_id, user.id)
    changeset = Post.changeset(%Post{}, attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes", %{user: user} do
    attrs = @missing_body_attrs |> Map.put(:user_id, user.id)
    changeset = Post.changeset(%Post{}, attrs)
    refute changeset.valid?
  end

  test "changeset without user_id" do
    changeset = Post.changeset(%Post{}, @valid_attrs)
    refute changeset.valid?
  end
end
