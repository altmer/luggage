defmodule Luggage.Web.PageControllerTest do
  use Luggage.Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "luggage-app"
  end
end
