defmodule Luggage.Repo do
  use Ecto.Repo, otp_app: :luggage
  use Scrivener, page_size: 10
end
