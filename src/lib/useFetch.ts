import { useEffect, useState } from 'react'

export function useFetch<T>(load: () => Promise<T>, deps: unknown[]) {
  const [state, set] = useState<{ data?: T; error?: string; loading: boolean }>({ loading: true })
  useEffect(() => {
    let live = true
    set((s) => ({ ...s, loading: true, error: undefined }))
    load().then(
      (data) => live && set({ data, loading: false }),
      (e: Error) => live && set({ error: e.message, loading: false }),
    )
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return state
}
