defmodule Luggage.Accounts.AuthTokenSweeper do
  @moduledoc """
    Periodically purges expired tokens from the DB.
    Mostly a copy from GuardianDB.ExpiredSweeper.
  """
  use GenServer

  alias Luggage.Accounts.AuthTokens

  # interval is one hour (in ms)
  @interval 60 * 60 * 1000

  # Client functions

  @doc """
  Reset the purge timer.
  """
  def reset_timer do
    GenServer.call(__MODULE__, :reset_timer)
  end

  @doc """
  Manually trigger a db purge of expired tokens.
  Also resets the current timer.
  """
  def purge do
    GenServer.call(__MODULE__, :sweep)
  end

  def handle_call(:reset_timer, _from, state) do
    {:reply, :ok, reset_state_timer(state)}
  end

  def handle_call(:sweep, _from, state) do
    {:reply, :ok, sweep(state)}
  end

  def handle_info(:sweep, state) do
    {:noreply, sweep(state)}
  end

  def handle_info(_, state) do
    {:ok, state}
  end

  # Server functions

  def start_link,
    do: start_link([])

  def start_link(state, _opts \\ []) do
    GenServer.start_link(__MODULE__, Enum.into(state, %{}), name: __MODULE__)
  end

  @doc """
    init function schedules work to be performed after some time and returns
    state with :timer
  """
  def init(state) do
    {:ok, reset_state_timer(state)}
  end

  # Internal functions

  defp reset_state_timer(state) do
    if state[:timer] do
      Process.cancel_timer(state.timer)
    end
    timer = Process.send_after(self(), :sweep, @interval)
    Map.merge(state, %{timer: timer})
  end

  defp sweep(state) do
    AuthTokens.purge_expired
    reset_state_timer(state)
  end
end
