defmodule Luggage.CommentsTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Blogs.Comments

  describe "Comments.get" do
    test "returns nil if comment not found" do
      assert nil == Comments.get(100500)
    end

    test "returns comment if it exists" do
      comment = insert(:comment)
      comment_found = Comments.get(comment.id, [:user])
      assert comment.id == comment_found.id
      assert comment.text == comment_found.text
      # user is preloaded
      assert comment.user
    end
  end

  describe "Comments.list" do
    test "it returns comments paginated" do
      insert_list(15, :comment)

      comments = Comments.list

      assert 1 == comments.page_number
      assert 2 == comments.total_pages
      assert 10 == Enum.count(comments.entries)
    end

    test "it returns comments by user_id" do
      insert_list(3, :comment)
      user = insert(:user)
      insert_list(5, :comment, user: user)

      comments = Comments.list(%{"user_id" => user.id}, [:user])

      assert 1 == comments.page_number
      assert 1 == comments.total_pages
      assert 5 == Enum.count(comments.entries)

      comment = List.first(comments.entries)
      assert comment.user
    end

    test "it returns comments by post_id paginated" do
      insert_list(2, :comment)
      post = insert(:post)
      insert_list(4, :comment, post: post)

      comments = Comments.list(%{"post_id" => post.id}, [:user])

      assert 1 == comments.page_number
      assert 1 == comments.total_pages
      assert 4 == Enum.count(comments.entries)

      comment = List.first(comments.entries)
      assert comment.user
    end
  end

  describe "Comments.add" do
    test "it adds and returns comment if params are valid" do
      user = insert(:user)
      post = insert(:post)
      assert {:ok, new_comment} = Comments.add(
        %{"text" => "comment"}, user, post
      )

      assert "comment" == new_comment.text
      assert user.id == new_comment.user_id
      assert post.id == new_comment.post_id
    end

    test "it returns changeset if inserting failed" do
      user = insert(:user)
      post = insert(:post)
      assert {:error, changeset} = Comments.add(
        %{"text" => ""}, user, post
      )
      refute changeset.valid?
    end
  end
end
