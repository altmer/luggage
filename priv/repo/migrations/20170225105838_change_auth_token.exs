defmodule Luggage.Repo.Migrations.ChangeAuthToken do
  use Ecto.Migration

  def change do
    alter table(:auth_tokens) do
      add :jwt, :text, null: false
      add :jti, :string, null: false
      add :aud, :string, null: false
      add :exp, :integer, null: false

      remove :token
    end
  end
end
