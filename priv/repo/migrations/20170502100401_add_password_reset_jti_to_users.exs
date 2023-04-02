defmodule Luggage.Repo.Migrations.AddPasswordResetJtiToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :reset_password_jti, :string
    end
  end
end
