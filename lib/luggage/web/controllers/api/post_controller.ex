defmodule Luggage.Web.PostController do
  use Luggage.Web, :controller

  alias Luggage.Blogs.Posts

  action_fallback Luggage.Web.FallbackController

  plug Guardian.Plug.EnsureAuthenticated,
    %{handler: Luggage.Web.SessionController} when action in [
      :create, :update, :delete
    ]

  def index(conn, params) do
    render(conn, "index.json", paginated_posts: Posts.list(params, [:user]))
  end

  def create(conn, %{"post" => post_params}) do
    case Posts.add(post_params, current_user(conn)) do
      {:ok, post} ->
        conn
        |> put_status(:created)
        |> render("show.json", post: post)
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def show(conn, %{"id" => id}) do
    render(conn, "full_post.json", post: Posts.get!(id, [:user]))
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    with post <- Posts.get_for_user(id, current_user(conn).id),
         {:ok, post} <- Posts.update(post, post_params) do
      render(conn, "show.json", post: post)
    else
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def delete(conn, %{"id" => id}) do
    id
    |> Posts.get_for_user(current_user(conn).id)
    |> Posts.delete

    send_resp(conn, :no_content, "")
  end
end
