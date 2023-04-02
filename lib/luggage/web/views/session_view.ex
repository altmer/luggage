defmodule Luggage.Web.SessionView do
  use Luggage.Web, :view

  alias Luggage.Web.UserView

  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: UserView.render("user_badge.json", user: user)
    }
  end

  def render("error.json", _) do
    %{errors: %{error: "Invalid email or password"}}
  end

  def render("delete.json", _) do
    %{ok: true}
  end

  def render("locale.json", %{user: user}) do
    %{locale: user.locale}
  end

  def render("forbidden.json", %{error: error}) do
    %{error: error}
  end
end
