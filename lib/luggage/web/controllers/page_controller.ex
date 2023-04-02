defmodule Luggage.Web.PageController do
  use Luggage.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
