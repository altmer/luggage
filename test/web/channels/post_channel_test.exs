defmodule Luggage.Web.PostChannelTest do
  use Luggage.Web.ChannelCase

  import Luggage.Factory

  alias Luggage.Blogs.Comment
  alias Luggage.Web.PostChannel

  setup do
    user = insert(:user)
    post = insert(:post)
    {:ok, _, socket} =
      socket("users_socket:#{user.id}", %{current_user: user})
      |> subscribe_and_join(PostChannel, "post:#{post.id}")

    {:ok, socket: socket, user: user, post: post}
  end

  describe "comment:add" do
    test "it adds new comment and broadcasts it when text is provided",
      %{socket: socket, user: user, post: post} do
      user_id = user.id

      ref = push socket, "comment:add", %{"text" => "new comment text"}
      assert_reply ref, :ok
      assert_broadcast "comment:created", %{
        comment: %{
          id: comment_id,
          text: "new comment text",
          user: %{
            id: ^user_id
          }
        }
      }

      # check that comment is created for the right post
      assert Repo.get_by(Comment, post_id: post.id, id: comment_id)
    end

    test "it responds with errors when text is not provided", %{socket: socket} do
      ref = push socket, "comment:add", %{"text" => ""}
      assert_reply ref, :error, %{errors: %{text: ["can't be blank"]}}, 500
    end
  end
end
