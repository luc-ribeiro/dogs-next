interface apiErrorResponse {
  data: null
  ok: false
  error: string
}

export default function apiError(error: unknown): apiErrorResponse {
  if (error instanceof Error) {
    return { ok: false, error: error.message, data: null }
  } else {
    return { ok: false, error: 'Generic Error', data: null }
  }
}