'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type UseUserMediaOptions = {
  audio?: boolean
  video?: boolean | MediaTrackConstraints
}

type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'

export function useUserMedia(options: UseUserMediaOptions) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [status, setStatus] = useState<PermissionState>('idle')
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    streamRef.current = null
    setStream(null)
    setStatus('idle')
  }, [])

  const start = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported')
      setError('Browser tidak mendukung akses kamera atau microphone.')
      return false
    }

    try {
      setStatus('requesting')
      setError(null)
      streamRef.current?.getTracks().forEach(track => track.stop())

      const nextStream = await navigator.mediaDevices.getUserMedia(options)
      streamRef.current = nextStream
      setStream(nextStream)
      setStatus('granted')
      return true
    } catch (err) {
      setStatus('denied')
      setError(err instanceof Error ? err.message : 'Akses kamera atau microphone ditolak.')
      return false
    }
  }, [options])

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop())
    }
  }, [])

  return { stream, status, error, start, stop }
}
