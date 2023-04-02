use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :luggage, Luggage.Web.Endpoint,
  http: [port: 4001],
  server: false,
  secret_key_base: "2cZ4DdZKTfTogyYTouT7TT5cuhErXG5lES5EKqPmGxAujTRyPfpxKc9HoydtYKoL_test_key"

# Print only warnings and errors during test
config :logger, level: :warn

config :logger, :logger_papertrail_backend,
  url: "papertrail://logs.papertrail.com:1234/testapp",
  level: :warn,
  format: "$time $metadata $message"

# Configure your database
config :luggage, Luggage.Repo,
  database: "luggage_test",
  pool: Ecto.Adapters.SQL.Sandbox

config :guardian, Guardian,
  secret_key: "2cZ4DdZKTfTogyYTouT7TT5cuhErXG5lES5EKqPmGxAujTRyPfpxKc9HoydtYKoL_test_key"

config :arc,
  storage: Arc.Storage.Local

config :luggage, Luggage.Emails.Mailer,
  adapter: Bamboo.TestAdapter
