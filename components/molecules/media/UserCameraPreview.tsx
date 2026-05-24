'use client'

import { useEffect, useRef } from 'react'
import { Camera, CameraOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type UserCameraPreviewProps = {
  stream: MediaStream | null
  status: 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'
  className?: string
  compact?: boolean
}

export default function UserCameraPreview({
  stream,
  status,
  className,
  compact,
}: UserCameraPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.srcObject = stream
  }, [stream])

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] border border-black/[0.08] bg-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]',
        compact ? 'aspect-video min-h-20 sm:min-h-28' : 'aspect-video min-h-44 sm:min-h-56',
        className,
      )}
    >
      {stream && status === 'granted' ? (
        <video
          ref={videoRef}
          className="h-full w-full scale-x-[-1] object-cover"
          autoPlay
          muted
          playsInline
        />
      ) : (
        <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-3 text-center text-white/55">
          {status === 'denied' || status === 'unsupported' ? (
            <CameraOff className={compact ? 'h-6 w-6' : 'h-9 w-9'} />
          ) : (
            <Camera className={compact ? 'h-6 w-6' : 'h-9 w-9'} />
          )}
          <p className={compact ? 'text-[0.65rem]' : 'text-sm'}>
            {status === 'requesting'
              ? 'Meminta akses kamera...'
              : status === 'denied'
                ? 'Kamera tidak tersedia'
                : status === 'unsupported'
                  ? 'Kamera tidak didukung'
                  : 'Preview kamera'}
          </p>
        </div>
      )}

      <div className="absolute left-2 top-2 rounded-full border border-white/15 bg-black/35 px-2 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-widest text-white/80 backdrop-blur sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[0.58rem]">
        Kamu
      </div>
      {stream && status === 'granted' && (
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-widest text-white sm:right-3 sm:top-3 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[0.58rem]">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Live
        </div>
      )}
    </div>
  )
}
