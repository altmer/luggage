defmodule Luggage.Accounts.Avatar do
  @moduledoc """
    Definition of avatar uploading process
  """

  use Arc.Definition
  # Include ecto support
  use Arc.Ecto.Definition

  # To add a thumbnail version:
  @versions [:original, :thumb]

  # Whitelist file extensions:
  # def validate({file, _}) do
  #   ~w(.jpg .jpeg .gif .png) |> Enum.member?(Path.extname(file.file_name))
  # end

  def transform(:original, {_, scope}) do
    {
      :convert,
      crop_string(scope),
      :png
    }
  end

  def transform(:thumb, {_, scope}) do
    {
      :convert,
      crop_string(scope) <> " " <> "-strip -thumbnail 100x100^ -gravity center -extent 100x100",
      :png
    }
  end

  def filename(version, _) do
    version
  end

  def storage_dir(_, {_, scope}) do
    folder = Base.encode16(:crypto.hash(:md5, Integer.to_string(scope.id)))
    "uploads/users/#{folder}/avatar"
  end

  defp crop_string(scope) do
    do_crop_string(
      scope.crop_width, scope.crop_height, scope.crop_x, scope.crop_y
    )
  end
  defp do_crop_string(nil, nil, nil, nil),
    do: "-format png"
  defp do_crop_string(crop_width, crop_height, crop_x, crop_y),
    do: "-crop #{crop_width}x#{crop_height}+#{crop_x}+#{crop_y} -format png"

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  # def s3_object_headers(version, {file, scope}) do
  #   [content_type: Plug.MIME.path(file.file_name)]
  # end
end
