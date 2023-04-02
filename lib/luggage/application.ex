defmodule Luggage.Application do
  @moduledoc """
    Main application module
  """
  use Application

  alias Luggage.Repo
  alias Luggage.Web.Endpoint

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Repo, []),
      # Start the endpoint when the application starts
      supervisor(Endpoint, []),
      worker(Luggage.Accounts.AuthTokenSweeper, [])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Luggage.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
