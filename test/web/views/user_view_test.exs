defmodule Luggage.Web.UserViewTest do
  use Luggage.Web.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View
  # imports factories
  import Luggage.Factory

  # show.json
  test "renders user information in json" do
    user = insert(:user, name: "John Doe")
    expected_color = "user-color-#{rem user.id, 4}"
    json = render(Luggage.Web.UserView, "show.json", %{user: user})
    assert json[:id] == user.id
    assert json[:name] == user.name
    assert json[:color] == expected_color
    assert json[:initials] == "JD"
    assert json[:bio] == user.bio
  end

  # test initials
  test "capitalizes initials" do
    user = insert(:user, name: "kurt maison")
    assert render(Luggage.Web.UserView, "show.json", %{user: user})[:initials] == "KM"
  end

  test "split only using spaces" do
    user = insert(:user, name: "Lokk-Franz")
    assert render(Luggage.Web.UserView, "show.json", %{user: user})[:initials] == "L"
  end

  test "takes only two first letters" do
    user = insert(:user, name: "Pedro Carlos Juan XIII Martinez Escudero Villanueva Cortes")
    assert render(Luggage.Web.UserView, "show.json", %{user: user})[:initials] == "PC"
  end
end
