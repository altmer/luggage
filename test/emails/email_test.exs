defmodule Luggage.EmailTest do
  use ExUnit.Case

  alias Luggage.Emails

  test "reset password email with nil locale" do
    email = Emails.reset_password_email(
      "customer@example.com",
      "John Doe",
      "http://reset-link",
      nil
    )
    assert email.from == "noreply@luggage.com"
    assert email.subject == "Password reset"
    assert email.to == {"John Doe", "customer@example.com"}
    assert email.html_body =~ "Hello, John Doe!"
    assert email.html_body =~ "http://reset-link"
  end

  test "reset password email with specified locale" do
    email = Emails.reset_password_email(
      "customer@example.com",
      "John Doe",
      "http://reset-link",
      "ru"
    )
    assert email.subject == "Восстановление пароля"
    assert email.html_body =~ "Привет, John Doe!"
  end
end
