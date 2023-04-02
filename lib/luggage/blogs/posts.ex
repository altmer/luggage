defmodule Luggage.Blogs.Posts do
  @moduledoc """
    CRUD actions for posts entities
  """

  import Luggage.Common.Query

  alias Luggage.Repo
  alias Luggage.Blogs.Post

  def get(id, preloads \\ []) do
    Post
    |> Repo.get(id)
    |> Repo.preload(preloads)
  end

  def get!(id, preloads \\ []) do
    Post
    |> Repo.get!(id)
    |> Repo.preload(preloads)
  end

  def get_for_user(id, user_id) do
    Repo.get_by!(Post, %{id: id, user_id: user_id})
  end

  def list(params, preloads \\ []) do
    Post
    |> filter_if_present(:user_id, params["user_id"])
    |> search_if_term(:title, params["term"])
    |> order_newest_first()
    |> preload_assoc(preloads)
    |> Repo.paginate(params)
  end

  def add(post_params, user) do
    %Post{}
    |> Post.changeset(
      Map.merge(post_params, %{"user_id" => user.id})
    )
    |> Repo.insert
  end

  def update(post, post_params) do
    post
    |> Post.update(post_params)
    |> Repo.update
  end

  def delete(post), do: Repo.delete!(post)
end
