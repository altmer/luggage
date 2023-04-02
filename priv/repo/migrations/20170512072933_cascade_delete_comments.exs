defmodule Luggage.Repo.Migrations.CascadeDeleteComments do
  use Ecto.Migration

  def change do
    execute "ALTER TABLE comments DROP CONSTRAINT comments_post_id_fkey"

    alter table(:comments) do
      modify :post_id, references(:posts, on_delete: :delete_all)
    end
  end
end
