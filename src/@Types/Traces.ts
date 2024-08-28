export type Trace = {
  id: number
  stravaId: string
  stravaHash: string
  start: string
  finish: string
  description: string
  distance: number
  elevation: number
  created_at: string
  updated_at: string | null
}

export type Traces = Trace[]
