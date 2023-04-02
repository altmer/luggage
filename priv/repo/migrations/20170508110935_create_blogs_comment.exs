defmodule Luggage.Repo.Migrations.CreateLuggage.Blogs.Comment do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :text, :string

      add :user_id, references(:users)
      add :post_id, references(:posts)

      timestamps()
    end
    create index(:comments, [:user_id])
    create index(:comments, [:post_id])
  end
end
