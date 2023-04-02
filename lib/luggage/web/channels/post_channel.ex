defmodule Luggage.Web.PostChannel do
  @moduledoc """
    Channel for adding new comments to the post.
  """
  use Luggage.Web, :channel

  alias Luggage.Blogs.{Comments, Posts}
  alias Luggage.Web.{ChangesetView, CommentView}

  def join("post:" <> post_id, _payload, socket) do
    post = Posts.get(post_id)
    {:ok, assign(socket, :post, post)}
  end

  def handle_in("comment:add", %{"text" => text}, socket) do
    %{current_user: current_user, post: post} = socket.assigns
    case Comments.add(%{"text" => text}, current_user, post) do
      {:ok, comment} ->
        # we need to preload user but instead we can merge current_user
        # into comment struct to avoid database query
        broadcast! socket, "comment:created", %{
          comment: CommentView.render(
            "show.json",
            comment: Map.merge(comment, %{user: current_user})
          )
        }
        {:reply, :ok, socket}
      {:error, changeset} ->
        #
        {
          :reply,
          {:error, ChangesetView.render("error.json", changeset: changeset)},
          socket
        }
    end
  end
end
