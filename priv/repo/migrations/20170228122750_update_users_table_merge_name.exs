defmodule Luggage.Repo.Migrations.UpdateUsersTableMergeName do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :name, :string, null: false

      remove :first_name
      remove :last_name
    end
  end
end
