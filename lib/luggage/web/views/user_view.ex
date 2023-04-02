defmodule Luggage.Web.UserView do
  use Luggage.Web, :view

  alias Luggage.Accounts.Avatar

  def render("show.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      color: color(user),
      initials: initials(user),
      bio: user.bio,
      locale: user.locale,
      avatar: %{
        thumb: Avatar.url({user.avatar, user}, :thumb)
      }
    }
  end

  def render("user_badge.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      color: color(user),
      initials: initials(user),
      locale: user.locale,
      avatar: %{
        thumb: Avatar.url({user.avatar, user}, :thumb)
      }
    }
  end

  def render("error.json", _) do
  end

  defp color(user) do
    "user-color-#{rem user.id, 4}"
  end

  defp initials(user) do
    user.name
    |> String.split(~r{\s}, trim: true)
    |> Enum.map(&(String.first(&1)))
    |> Enum.take(2)
    |> Enum.join
    |> String.upcase
  end
end
