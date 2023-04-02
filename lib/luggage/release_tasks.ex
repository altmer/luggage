defmodule Luggage.ReleaseTasks do
  @moduledoc """
    Migrations after production release runner
  """
  alias Ecto.Migrator
  alias Luggage.Repo

  @start_apps [
    :postgrex,
    :ecto
  ]

  @myapps [
    :luggage
  ]

  @repos [
    Repo
  ]

  def migrate do
    IO.puts "Loading luggage.."
    # Load the code for luggage, but don't start it
    :ok = Application.load(:luggage)

    IO.puts "Starting dependencies.."
    # Start apps necessary for executing migrations
    Enum.each(@start_apps, &Application.ensure_all_started/1)

    # Start the Repo(s) for luggage
    IO.puts "Starting repos.."
    Enum.each(@repos, &(&1.start_link(pool_size: 1)))

    # Run migrations
    Enum.each(@myapps, &run_migrations_for/1)

    # Signal shutdown
    IO.puts "Success!"
    :init.stop()
  end

  def priv_dir(app), do: "#{:code.priv_dir(app)}"

  defp run_migrations_for(app) do
    IO.puts "Running migrations for #{app}"
    Migrator.run(Repo, migrations_path(app), :up, all: true)
  end

  defp migrations_path(app), do: Path.join([priv_dir(app), "repo", "migrations"])
end
