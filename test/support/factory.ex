defmodule Luggage.Factory do
  use ExMachina.Ecto, repo: Luggage.Repo

  alias Luggage.Accounts.User
  alias Luggage.Blogs.{Comment, Post}

  def user_factory do
    %User{
      name: Faker.Name.name,
      email: Faker.Internet.safe_email,
      encrypted_password: Comeonin.Bcrypt.hashpwsalt("12345678"),
      bio: Faker.Lorem.paragraph(%Range{first: 1, last: 2})
    }
  end

  def post_factory do
    %Post{
      title: Faker.Lorem.sentence(%Range{first: 1, last: 10}),
      body: Faker.Lorem.paragraph(%Range{first: 1, last: 3}),
      user: build(:user)
    }
  end

  def comment_factory do
    %Comment{
      text: Faker.Lorem.paragraph(1),
      user: build(:user),
      post: build(:post)
    }
  end
end
