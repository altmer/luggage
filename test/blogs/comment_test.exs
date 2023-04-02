defmodule Luggage.CommentTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Blogs.Comment

  setup do
    user = insert(:user)
    post = insert(:post)

    {:ok, %{user: user, post: post}}
  end

  @valid_attrs %{text: "some body"}
  @missing_text_attrs %{text: ""}

  test "changeset with valid attributes", %{user: user, post: post} do
    attrs = @valid_attrs
            |> Map.put(:user_id, user.id)
            |> Map.put(:post_id, post.id)

    changeset = Comment.changeset(%Comment{}, attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes", %{user: user, post: post} do
    attrs = @missing_text_attrs
            |> Map.put(:user_id, user.id)
            |> Map.put(:post_id, post.id)

    changeset = Comment.changeset(%Comment{}, attrs)
    refute changeset.valid?
  end

  test "changeset without user_id and post_id" do
    changeset = Comment.changeset(%Comment{}, @valid_attrs)
    refute changeset.valid?
  end
end
