# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :luggage,
  ecto_repos: [Luggage.Repo]

# Configures the endpoint
config :luggage, Luggage.Web.Endpoint,
  url: [host: "localhost", port: "23000"],
  secret_key_base: "${SECRET_KEY_BASE}",
  render_errors: [view: Luggage.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Luggage.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger,
  backends: [:console, Rollbax.Logger, LoggerPapertrailBackend.Logger]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :logger, Rollbax.Logger,
  level: :error

config :logger, :logger_papertrail_backend,
  url: "${PAPERTRAIL_URL}",
  level: :warn,
  format: "$time $metadata $message"

config :luggage, Luggage.Repo,
  adapter: Ecto.Adapters.Postgres,
  hostname: System.get_env("POSTGRES_HOST") || "localhost",
  username: "postgres",
  password: ""

config :luggage, Luggage.Emails.Mailer,
  adapter: Bamboo.SMTPAdapter,
  server: "${SMTP_DOMAIN}",
  port: "${SMTP_PORT}",
  username: "${SMTP_USERNAME}",
  password: "${SMTP_PASSWORD}",
  tls: :if_available, # can be `:always` or `:never`
  ssl: false, # can be `true`
  retries: 1,
  from: "noreply@luggage.com"

config :guardian, Guardian,
  hooks: Luggage.Accounts.GuardianHooks,
  issuer: "Luggage",
  ttl: {3, :days},
  verify_issuer: true,
  secret_key: "${SECRET_KEY_BASE}",
  serializer: Luggage.Accounts.GuardianSerializer

config :arc,
  storage: Arc.Storage.S3,
  bucket: "${AWS_S3_BUCKET}",
  virtual_host: true

config :ex_aws,
   access_key_id: "${AWS_S3_KEY}",
   secret_access_key: "${AWS_S3_SECRET}",
   region: "eu-central-1",
   host: "s3.eu-central-1.amazonaws.com",
   s3: [
     scheme: "https://",
     host: "s3.eu-central-1.amazonaws.com",
     region: "eu-central-1"
   ]

config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, []}
  ]

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: "${GOOGLE_CLIENT_ID}",
  client_secret: "${GOOGLE_CLIENT_SECRET}"

config :rollbax,
  access_token: "${ROLLBAR_ACCESS_TOKEN}",
  environment: "test"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
