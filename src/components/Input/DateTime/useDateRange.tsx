import { Dayjs } from 'dayjs'
import { useReducer } from 'react'

interface DateRangeState {
  start: Dayjs | null
  end: Dayjs | null
}

type DateRangeAction =
  | { type: 'SET_START'; payload: Dayjs | null }
  | { type: 'SET_END'; payload: Dayjs | null }

function dateRangeReducer(
  state: DateRangeState,
  action: DateRangeAction
): DateRangeState {
  const { type, payload } = action

  if (type === 'SET_START') {
    let end = state.end
    if (payload && state.end && payload > state.end) {
      // clear end-date, if user entered a higher start-date (ensure end > start)
      end = null
    }

    return { start: payload, end }
  }

  if (type === 'SET_END') {
    let start = state.start
    if (payload && state.start && payload < state.start) {
      // clear start-date, if user entered a lower end-date
      start = null
    }
    return { start, end: payload }
  }

  throw new Error(`Unhandled action ${type}`)
}

export default function useDateRange() {
  const [{ start, end }, dispatch] = useReducer(dateRangeReducer, {
    start: null,
    end: null
  })

  const handleStartChange = (value: Dayjs | null) => {
    dispatch({ type: 'SET_START', payload: value })
  }

  const handleEndChange = (value: Dayjs | null) => {
    dispatch({ type: 'SET_END', payload: value })
  }

  return { start, end, handleStartChange, handleEndChange }
}
