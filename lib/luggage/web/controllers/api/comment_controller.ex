defmodule Luggage.Web.CommentController do
  use Luggage.Web, :controller

  alias Luggage.Blogs.Comments

  action_fallback Luggage.Web.FallbackController

  def index(conn, params) do
    render(conn, "index.json", paginated_comments: Comments.list(params, [:user]))
  end
end
