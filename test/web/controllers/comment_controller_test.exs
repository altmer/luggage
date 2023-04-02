defmodule Luggage.Web.CommentControllerTest do
  use Luggage.Web.ConnCase

  import Luggage.Factory

  alias Luggage.Blogs.Comment

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "GET :index" do
    test "lists paginated entries on index", %{conn: conn} do
      insert_list(15, :comment)

      conn = get conn, comment_path(conn, :index)

      json = json_response(conn, 200)

      comments = json["comments"]
      assert Enum.count(comments) == 10
      json_comment = Enum.fetch!(comments, 0)

      db_comment = Comment
                   |> Repo.get(Map.fetch!(json_comment, "id"))
                   |> Repo.preload(:user)

      assert json_comment["id"] == db_comment.id
      assert json_comment["text"] == db_comment.text
      assert json_comment["inserted_at"] == NaiveDateTime.to_iso8601(db_comment.inserted_at)
      assert json_comment["user"]["id"] == db_comment.user.id
      assert json_comment["user"]["name"] == db_comment.user.name

      assert json["page"] == 1
      assert json["total_pages"] == 2
    end

    test "paginates entries", %{conn: conn} do
      insert_list(15, :comment)

      conn = get conn, comment_path(conn, :index, page: 2)
      json = json_response(conn, 200)
      comments = json["comments"]

      assert Enum.count(comments) == 5
      assert json["page"] == 2
      assert json["total_pages"] == 2
    end

    test "searches comments by user", %{conn: conn} do
      user = insert(:user)
      insert_list(7, :comment, user: user)
      insert_list(4, :comment)

      conn = get conn, comment_path(conn, :index, user_id: user.id)

      json = json_response(conn, 200)
      comments = json["comments"]

      assert Enum.count(comments) == 7
      assert json["page"] == 1
      assert json["total_pages"] == 1
    end
  end
end
