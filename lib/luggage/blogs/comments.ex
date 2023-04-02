defmodule Luggage.Blogs.Comments do
  @moduledoc """
    CRUD actions for comments entities
  """

  import Luggage.Common.Query

  alias Luggage.Repo
  alias Luggage.Blogs.Comment

  def get(id, preloads \\ []) do
    Comment
    |> Repo.get(id)
    |> Repo.preload(preloads)
  end

  def list(params \\ %{}, preloads \\ []) do
    Comment
    |> filter_if_present(:user_id, params["user_id"])
    |> filter_if_present(:post_id, params["post_id"])
    |> order_newest_first()
    |> preload_assoc(preloads)
    |> Repo.paginate(params)
  end

  def add(comment_params, user, post) do
    params = comment_params
             |> Map.merge(%{"user_id" => user.id, "post_id" => post.id})

    %Comment{}
    |> Comment.changeset(params)
    |> Repo.insert()
  end
end
