defmodule Luggage.Web.ControllerHelpers do
  @moduledoc """
    Common helpers
  """

  alias Guardian.Plug, as: GuardianPlug

  def current_user(conn) do
    GuardianPlug.current_resource(conn)
  end
end
