defmodule Luggage.Repo.Migrations.AddAuthTokens do
  use Ecto.Migration

  def change do
    create table(:auth_tokens) do
      add :token, :text, null: false
      add :user_id, references(:users)

      timestamps()
    end
    create index(:auth_tokens, [:token])
  end
end
