defmodule Luggage.Web.PostView do
  use Luggage.Web, :view

  alias Luggage.Web.UserView

  def render("index.json", %{paginated_posts: posts}) do
    %{
      posts: render_many(
        posts.entries, Luggage.Web.PostView, "post_card.json"
      ),
      page: posts.page_number,
      total_pages: posts.total_pages
    }
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, Luggage.Web.PostView, "post.json")}
  end

  def render("full_post.json", %{post: post}) do
    %{
      data: %{
        id: post.id,
        title: post.title,
        body: post.body,
        inserted_at: post.inserted_at,
        updated_at: post.updated_at,
        user_id: post.user_id,
        user: UserView.render("user_badge.json", user: post.user)
      }
    }
  end

  def render("post_card.json", %{post: post}) do
    %{
      id: post.id,
      title: post.title,
      body: trim(post.body),
      inserted_at: post.inserted_at,
      user: UserView.render("user_badge.json", user: post.user)
    }
  end

  def render("post.json", %{post: post}) do
    %{
      id: post.id,
      title: post.title,
      body: post.body,
      user_id: post.user_id,
      inserted_at: post.inserted_at
    }
  end

  defp trim(text) do
    res = text
            |> String.split("\n")
            |> Enum.take(5)
            |> Enum.join("\n")
            |> String.slice(0, 300)

    if res != text do
      res <> "..."
    else
      res
    end
  end
end
