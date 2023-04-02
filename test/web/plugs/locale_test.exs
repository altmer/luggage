defmodule Luggage.Web.LocaleTest do
  use Luggage.Web.ConnCase

  describe "call" do
    test "sets locale if locale is valid", %{conn: conn} do
      assert "en" = Gettext.get_locale(Luggage.Web.Gettext)

      conn
      |> put_req_header("x-locale", "de")
      |> Luggage.Plugs.Locale.call("ru")

      assert "de" = Gettext.get_locale(Luggage.Web.Gettext)
    end

    test "sets default if locale is invalid", %{conn: conn} do
      assert "en" = Gettext.get_locale(Luggage.Web.Gettext)

      conn
      |> put_req_header("x-locale", "fr")
      |> Luggage.Plugs.Locale.call("ru")

      assert "ru" = Gettext.get_locale(Luggage.Web.Gettext)
    end

    test "sets default if locale is nil", %{conn: conn} do
      assert "en" = Gettext.get_locale(Luggage.Web.Gettext)

      conn
      |> Luggage.Plugs.Locale.call("ru")

      assert "ru" = Gettext.get_locale(Luggage.Web.Gettext)
    end
  end
end
