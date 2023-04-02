defmodule Luggage.PostsTest do
  use Luggage.DataCase

  import Luggage.Factory

  alias Luggage.Blogs.Posts

  describe "Posts.list" do
    test "it returns posts that match given term" do
      insert_list(5, :post)
      insert_list(3, :post, title: "Very searchable title!")
      posts = Posts.list(%{"term" => "y search"}, [:user])
      assert 1 == posts.page_number
      assert 1 == posts.total_pages
      assert 3 == Enum.count(posts.entries)

      post = List.first(posts.entries)
      assert post.user
      assert "Very searchable title!" == post.title
    end
  end
end
