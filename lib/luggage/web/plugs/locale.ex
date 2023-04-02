defmodule Luggage.Plugs.Locale do
  @moduledoc """
  Sets current Gettext locale based on x-locale header sent from API clients.
  """
  import Plug.Conn

  @locales ["en", "ru", "de"]

  def init(default), do: default

  def call(conn, default) do
    conn
    |> get_req_header("x-locale")
    |> List.first()
    |> set_locale(default)

    conn
  end

  defp set_locale(locale, _) when locale in @locales,
    do: Gettext.put_locale(Luggage.Web.Gettext, locale)
  defp set_locale(_, default),
    do: Gettext.put_locale(Luggage.Web.Gettext, default)
end
