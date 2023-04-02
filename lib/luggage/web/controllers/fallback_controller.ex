defmodule Luggage.Web.FallbackController do
  use Luggage.Web, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Luggage.Web.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :forbidden}) do
    conn
    |> put_status(:forbidden)
    |> render(Luggage.Web.ErrorView, "forbidden.json")
  end

  def call(conn, {:error, :wrong_authentication}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Luggage.Web.SessionView, "error.json")
  end
end
