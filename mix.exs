defmodule Luggage.Mixfile do
  @moduledoc """
    Mix config
  """
  use Mix.Project

  def project do
    [app: :luggage,
     version: "0.0.1",
     elixir: "~> 1.4",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Luggage.Application, []},
      applications: [
        :phoenix, :phoenix_pubsub, :phoenix_html, :cowboy, :logger, :gettext,
        :phoenix_ecto, :postgrex, :comeonin, :faker, :scrivener_ecto, :arc,
        :arc_ecto, :ex_aws, :hackney, :poison, :bamboo, :bamboo_smtp,
        :ueberauth, :ueberauth_google, :rollbax, :logger_papertrail_backend,
        :guardian, :sweet_xml, :secure_random
      ]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0-rc.2", override: true},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.6"},
      {:gettext, "~> 0.11"},
      {:cowboy, "~> 1.0"},
      {:comeonin, "~> 3.0"},
      {:guardian, "~> 0.14.0"},
      {:faker, "~> 0.7"},
      {:scrivener_ecto, "~> 1.0"},
      {:arc, "~> 0.8.0"},
      {:arc_ecto, "~> 0.7.0"},
      {:ex_aws, "~> 1.1"},
      {:hackney, "~> 1.7"},
      {:poison, "~> 3.0"},
      {:sweet_xml, "~> 0.6"},
      {:secure_random, "~> 0.5"},
      {:bamboo, "~> 0.8"},
      {:bamboo_smtp, "~> 1.3.0"},
      {:ueberauth, "~> 0.4"},
      {:ueberauth_google, "~> 0.5"},
      {:rollbax, "~> 0.6"},
      {:logger_papertrail_backend, "~> 0.2.0"},
      {:distillery, "~> 1.4"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:ex_machina, "~> 2.0", only: :test},
      {:credo, "~> 0.5", only: [:dev, :test]}
   ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
