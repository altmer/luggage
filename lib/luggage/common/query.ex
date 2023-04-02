defmodule Luggage.Common.Query do
  @moduledoc """
    Common querying functions
  """
  import Ecto.Query

  def order_newest_first(query) do
    from p in query,
      order_by: [desc: :inserted_at]
  end

  def filter_if_present(query, _, nil),
    do: query
  def filter_if_present(query, param, filter_value) do
    from p in query,
      where: field(p, ^param) == ^filter_value
  end

  def search_if_term(query, _, nil),
    do: query
  def search_if_term(query, param, term) do
    search_term = "%#{term}%"
    from p in query,
      where: ilike(field(p, ^param), ^search_term)
  end

  def preload_assoc(query, preloads) do
    from p in query,
      preload: ^preloads
  end
end
