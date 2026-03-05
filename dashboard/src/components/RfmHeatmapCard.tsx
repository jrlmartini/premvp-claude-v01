import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { rfmSegments } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

const heatmapGrid = [
  [12, 8, 5, 10, 8],
  [9, 7, 15, 9, 4],
  [11, 20, 18, 3, 2],
  [22, 14, 5, 2, 1],
  [25, 13, 3, 1, 0],
]

const recencyLabels = ['Muito recente', 'Recente', 'Moderado', 'Antigo', 'Muito antigo']
const frequencyLabels = ['1', '2', '3', '4', '5']

function getCellColor(value: number): string {
  if (value === 0) return 'var(--color-bg-main)'
  if (value <= 3) return 'var(--color-str-default)'
  if (value <= 8) return 'var(--color-chart-1)'
  if (value <= 14) return 'var(--color-chart-3)'
  if (value <= 20) return 'var(--color-chart-2)'
  return 'var(--color-st-success)'
}

export function RfmHeatmapCard() {
  const [hoveredCell, setHoveredCell] = useState<{ r: number; f: number } | null>(null)

  return (
    <Card className="col-span-8 row-span-5">
      <CardHeader>
        <CardTitle>Análise RFM — Mapa de calor</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-end mb-2">
            <div className="w-24" />
            <p className="flex-1 text-center text-txt-secondary text-[16px]">Frequência →</p>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-between w-24 pr-2">
              <p className="text-txt-secondary text-[16px] text-right leading-none mb-2 mt-1">Recência ↓</p>
              {recencyLabels.map((label) => (
                <div key={label} className="h-10 flex items-center justify-end">
                  <span className="text-[16px] text-txt-muted">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1 mb-1">
                {frequencyLabels.map((f) => (
                  <div key={f} className="text-center text-txt-secondary text-[16px] tabular-nums">{f}</div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-1">
                {heatmapGrid.map((row, ri) =>
                  row.map((val, fi) => (
                    <div
                      key={`${ri}-${fi}`}
                      className="h-10 rounded-sm flex items-center justify-center cursor-default transition-all relative"
                      style={{ backgroundColor: getCellColor(val) }}
                      onMouseEnter={() => setHoveredCell({ r: ri, f: fi })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-[16px] tabular-nums font-semibold text-txt-main">{val || ''}</span>
                      {hoveredCell?.r === ri && hoveredCell?.f === fi && val > 0 && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-bg-card border-[0.5px] border-str-default rounded-sm px-2 py-1 text-[16px] text-txt-main whitespace-nowrap z-10">
                          R={ri + 1}, F={fi + 1}: {val} clientes
                        </div>
                      )}
                    </div>
                  )),
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 ml-24">
            <span className="text-[16px] text-txt-muted">Menos</span>
            {[0, 3, 8, 14, 20, 25].map((v) => (
              <div key={v} className="w-6 h-4 rounded-sm" style={{ backgroundColor: getCellColor(v) }} />
            ))}
            <span className="text-[16px] text-txt-muted">Mais</span>
          </div>
        </div>

        <div className="w-64 border-l-[0.5px] border-str-default pl-4">
          <p className="text-txt-secondary text-[16px] mb-4 font-semibold">Segmentos</p>
          <div className="flex flex-col gap-2">
            {rfmSegments.map((seg) => (
              <div key={seg.segment} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[16px] text-txt-main truncate">{seg.segment}</span>
                    <span className="text-[16px] text-txt-secondary tabular-nums ml-2">{seg.count}</span>
                  </div>
                  <span className="text-[16px] text-txt-muted tabular-nums">{formatCurrency(seg.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
