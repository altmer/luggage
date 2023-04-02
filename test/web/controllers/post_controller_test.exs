defmodule Luggage.Web.PostControllerTest do
  use Luggage.Web.ConnCase

  import Luggage.Factory

  alias Luggage.Blogs.{Comment, Post}

  @valid_attrs %{body: "some content", title: "some title"}
  @invalid_attrs %{body: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  # GET :index
  test "lists paginated entries on index", %{conn: conn} do
    insert_list(15, :post)

    conn = get conn, post_path(conn, :index)

    json = json_response(conn, 200)
    posts = json["posts"]
    assert Enum.count(posts) == 10
    json_post = Enum.fetch!(posts, 0)
    db_post = Post |> Repo.get(Map.fetch!(json_post, "id")) |> Repo.preload(:user)

    assert json_post["id"] == db_post.id
    assert json_post["title"] == db_post.title
    assert json_post["body"] == db_post.body
    assert json_post["inserted_at"] == NaiveDateTime.to_iso8601(db_post.inserted_at)
    assert json_post["user"]["id"] == db_post.user.id
    assert json_post["user"]["name"] == db_post.user.name

    assert json["page"] == 1
    assert json["total_pages"] == 2
  end

  test "paginates entries", %{conn: conn} do
    insert_list(15, :post)

    conn = get conn, post_path(conn, :index, page: 2)
    json = json_response(conn, 200)
    posts = json["posts"]

    assert Enum.count(posts) == 5
    assert json["page"] == 2
    assert json["total_pages"] == 2
  end

  test "searches posts by user", %{conn: conn} do
    user = insert(:user)
    insert_list(7, :post, user: user)
    insert_list(4, :post)

    conn = get conn, post_path(conn, :index, user_id: user.id)

    json = json_response(conn, 200)
    posts = json["posts"]

    assert Enum.count(posts) == 7
    assert json["page"] == 1
    assert json["total_pages"] == 1
  end

  # GET :show
  test "shows chosen resource", %{conn: conn} do
    post = insert(:post)
    conn = get conn, post_path(conn, :show, post)
    json_post = json_response(conn, 200)["data"]
    assert json_post["id"] == post.id
    assert json_post["title"] == post.title
    assert json_post["body"] == post.body
    assert json_post["user_id"] == post.user_id
    assert json_post["inserted_at"] == NaiveDateTime.to_iso8601(post.inserted_at)
    assert json_post["updated_at"] == NaiveDateTime.to_iso8601(post.updated_at)
    assert json_post["user"]["id"] == post.user.id
    assert json_post["user"]["name"] == post.user.name
    assert json_post["user"]["color"] == "user-color-#{rem post.user.id, 4}"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, post_path(conn, :show, -1)
    end
  end

  # POST :create
  @tag :login
  test "creates and renders post when data is valid", %{conn: conn, logged_user: user} do
    conn = post conn, post_path(conn, :create), post: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    post = Repo.get_by(Post, @valid_attrs)
    assert post
    assert post.user_id == user.id
  end

  test "create action returns unauthenticated error if user is not logged in", %{conn: conn} do
    conn = post conn, post_path(conn, :create), post: @valid_attrs
    assert json_response(conn, 403)["error"]
  end

  @tag :login
  test "does not create post and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, post_path(conn, :create), post: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :login
  test "does not allow to create post for arbitrary user", %{conn: conn, logged_user: user} do
    another_user = insert(:user)
    conn = post conn, post_path(conn, :create), post: Map.merge(@valid_attrs, %{user_id: another_user.id})
    assert json_response(conn, 201)["data"]["id"]
    post = Repo.get_by(Post, @valid_attrs)
    assert post
    assert post.user_id == user.id
  end

  # PUT :update
  @tag :login
  test "updates and renders chosen post when data is valid and editing own post", %{conn: conn, logged_user: user} do
    post = insert(:post, %{user: user})
    conn = put conn, post_path(conn, :update, post), post: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Post, @valid_attrs)
  end

  @tag :login
  test "returns error when trying to update someone elses post", %{conn: conn} do
    post = insert(:post)
    assert_error_sent 404, fn ->
      put conn, post_path(conn, :update, post), post: @valid_attrs
    end
  end

  @tag :login
  test "does not update chosen post and renders errors when data is invalid", %{conn: conn, logged_user: user} do
    post = insert(:post, %{user: user})
    conn = put conn, post_path(conn, :update, post), post: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  @tag :login
  test "does not allow to change user_id on update", %{conn: conn, logged_user: user} do
    post = insert(:post, %{user: user})
    another_user = insert(:user)
    conn = put conn, post_path(conn, :update, post), post: Map.merge(@valid_attrs, %{user_id: another_user.id})
    assert json_response(conn, 200)["data"]["id"]
    updated_post = Repo.get(Post, post.id)
    assert updated_post.user_id == user.id
  end

  # DELETE :destroy
  @tag :login
  test "deletes chosen post when it is own post", %{conn: conn, logged_user: user} do
    post = insert(:post, %{user: user})
    conn = delete conn, post_path(conn, :delete, post)
    assert response(conn, 204)
    refute Repo.get(Post, post.id)
  end

  @tag :login
  test "returns error when trying to delete someone elses post", %{conn: conn} do
    post = insert(:post)
    assert_error_sent 404, fn ->
      delete conn, post_path(conn, :delete, post)
    end
  end

  @tag :login
  test "deletes post even if there are comments attached", %{conn: conn, logged_user: user} do
    post = insert(:post, user: user)
    comment = insert(:comment, post: post)
    conn = delete conn, post_path(conn, :delete, post)
    assert response(conn, 204)
    refute Repo.get(Post, post.id)
    refute Repo.get(Comment, comment.id)
  end
end
