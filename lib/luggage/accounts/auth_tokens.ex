defmodule Luggage.Accounts.AuthTokens do
  @moduledoc """
    Common functionality for auth tokens
  """
  import Ecto.Query

  alias Guardian.Utils
  alias Luggage.Repo
  alias Luggage.Accounts.AuthToken

  def purge_expired do
    Repo.delete_all expired_query()
  end

  defp expired_query do
    timestamp = Utils.timestamp()
    from t in AuthToken,
      where: t.exp < ^timestamp
  end
end
