import { useState, useCallback, useEffect } from 'react'
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react'

export function DashboardHeader() {
  const [isKiosk, setIsKiosk] = useState(false)
  const [lastUpdate] = useState(new Date())

  const toggleKiosk = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsKiosk(true)
    } else {
      document.exitFullscreen()
      setIsKiosk(false)
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault()
        toggleKiosk()
      }
      if (e.key === 'Escape' && isKiosk) {
        setIsKiosk(false)
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsKiosk(false)
      }
    }

    document.addEventListener('keydown', handleKey)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [isKiosk, toggleKiosk])

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-str-default bg-bg-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[8px] bg-chart-1 flex items-center justify-center">
            <span className="text-txt-main font-bold text-[14px]">C</span>
          </div>
          <div>
            <h1 className="text-[24px] font-semibold text-txt-main">Painel executivo</h1>
            <p className="text-[13px] text-txt-muted">Conatus Environmental Technologies</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-txt-muted tabular-nums">
          Atualizado: {lastUpdate.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
        <button
          className="p-2 rounded-[8px] border border-str-default text-txt-secondary hover:border-str-hover hover:text-txt-main transition-colors"
          title="Atualizar dados"
        >
          <RefreshCw size={16} />
        </button>
        <button
          onClick={toggleKiosk}
          className="p-2 rounded-[8px] border border-str-default text-txt-secondary hover:border-str-hover hover:text-txt-main transition-colors"
          title={isKiosk ? 'Sair do modo quiosque (Esc)' : 'Modo quiosque (Ctrl+Shift+K)'}
        >
          {isKiosk ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </header>
  )
}
