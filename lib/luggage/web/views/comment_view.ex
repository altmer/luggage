defmodule Luggage.Web.CommentView do
  use Luggage.Web, :view

  alias Luggage.Web.UserView

  def render("index.json", %{paginated_comments: comments}) do
    %{
      comments: render_many(
        comments.entries, Luggage.Web.CommentView, "show.json"
      ),
      page: comments.page_number,
      total_pages: comments.total_pages
    }
  end

  def render("show.json", %{comment: comment}) do
    %{
      id: comment.id,
      text: comment.text,
      inserted_at: comment.inserted_at,
      user: UserView.render("user_badge.json", user: comment.user)
    }
  end
end
