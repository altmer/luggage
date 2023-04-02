defmodule Luggage.Emails do
  @moduledoc """
    All the different emails that are sent by app
  """
  use Bamboo.Phoenix, view: Luggage.Web.EmailView

  import Luggage.Web.Gettext

  alias Luggage.Emails.Mailer

  def reset_password_email(email_address, name, reset_link, nil),
    do: reset_password_email(email_address, name, reset_link, "en")

  def reset_password_email(email_address, name, reset_link, locale) do
    Gettext.put_locale(Luggage.Web.Gettext, locale)

    base_email()
    |> to({name, email_address})
    |> subject(gettext("Password reset"))
    |> render(
      "password_reset.html",
      reset_link: reset_link,
      name: name
    )
  end

  defp base_email do
    new_email()
    |> from(Application.get_env(:luggage, Mailer)[:from])
    |> put_html_layout({Luggage.Web.LayoutView, "email.html"})
  end
end
