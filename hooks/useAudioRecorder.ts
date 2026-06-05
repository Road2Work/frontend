'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type VoiceCaptureStatus = 'idle' | 'requesting' | 'capturing' | 'stopped' | 'denied' | 'unsupported'

const emptyAudio = () => new Blob([], { type: 'audio/webm' })

function getSupportedMimeType() {
  if (typeof MediaRecorder === 'undefined') return ''

  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/wav']
  return candidates.find(type => MediaRecorder.isTypeSupported(type)) ?? ''
}

export function useAudioRecorder() {
  const [status, setStatus] = useState<VoiceCaptureStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const pendingResolveRef = useRef<((blob: Blob) => void) | null>(null)

  const cleanup = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    streamRef.current = null
    recorderRef.current = null
    chunksRef.current = []
    pendingResolveRef.current = null
  }, [])

  const start = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setStatus('unsupported')
      setError('Browser tidak mendukung akses mic berbasis suara.')
      return false
    }

    try {
      cleanup()
      setStatus('requesting')
      setError(null)

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      const mimeType = getSupportedMimeType()
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)

      streamRef.current = stream
      recorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = event => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }

      recorder.onstop = () => {
        const blob = chunksRef.current.length > 0
          ? new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
          : emptyAudio()
        pendingResolveRef.current?.(blob)
        cleanup()
        setStatus('stopped')
      }

      recorder.start()
      setStatus('capturing')
      return true
    } catch (err) {
      cleanup()
      setStatus('denied')
      setError(err instanceof Error ? err.message : 'Akses microphone ditolak.')
      return false
    }
  }, [cleanup])

  const stop = useCallback(async () => {
    const recorder = recorderRef.current

    if (!recorder || recorder.state === 'inactive') {
      cleanup()
      setStatus('stopped')
      return emptyAudio()
    }

    return new Promise<Blob>(resolve => {
      pendingResolveRef.current = resolve
      recorder.stop()
    })
  }, [cleanup])

  useEffect(() => {
    return () => cleanup()
  }, [cleanup])

  return { status, error, start, stop }
}
