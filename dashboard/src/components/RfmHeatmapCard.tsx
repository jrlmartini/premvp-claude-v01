import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { rfmSegments } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

// Build a 5x5 heatmap grid (Recency x Frequency)
// Values represent customer density
const heatmapGrid = [
  // F=1    F=2    F=3    F=4    F=5   (Frequency →)
  [12,      8,     5,    10,     8],  // R=1 (Most recent)
  [ 9,      7,    15,     9,     4],  // R=2
  [11,     20,    18,     3,     2],  // R=3
  [22,     14,     5,     2,     1],  // R=4
  [25,     13,     3,     1,     0],  // R=5 (Least recent)
]

const recencyLabels = ['Muito recente', 'Recente', 'Moderado', 'Antigo', 'Muito antigo']
const frequencyLabels = ['1', '2', '3', '4', '5']

function getCellColor(value: number): string {
  if (value === 0) return '#03131e'
  if (value <= 3) return '#214059'
  if (value <= 8) return '#275fc1'
  if (value <= 14) return '#2aa9e0'
  if (value <= 20) return '#19c2b8'
  return '#34d399'
}

export function RfmHeatmapCard() {
  const [hoveredCell, setHoveredCell] = useState<{ r: number; f: number } | null>(null)

  return (
    <Card className="col-span-8 row-span-5">
      <CardHeader>
        <CardTitle>Análise RFM — Mapa de calor</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6">
        {/* Heatmap */}
        <div className="flex-1">
          <div className="flex items-end mb-1">
            <div className="w-[90px]" />
            <p className="flex-1 text-center text-txt-secondary text-[13px]">Frequência →</p>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-between w-[90px] pr-2">
              <p className="text-txt-secondary text-[13px] text-right leading-none mb-2 mt-1">Recência ↓</p>
              {recencyLabels.map(label => (
                <div key={label} className="h-10 flex items-center justify-end">
                  <span className="text-[11px] text-txt-muted">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1 mb-1">
                {frequencyLabels.map(f => (
                  <div key={f} className="text-center text-txt-secondary text-[13px] tabular-nums">{f}</div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-1">
                {heatmapGrid.map((row, ri) =>
                  row.map((val, fi) => (
                    <div
                      key={`${ri}-${fi}`}
                      className="h-10 rounded-[6px] flex items-center justify-center cursor-default transition-all relative"
                      style={{ backgroundColor: getCellColor(val) }}
                      onMouseEnter={() => setHoveredCell({ r: ri, f: fi })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-[13px] tabular-nums font-semibold text-txt-main">{val || ''}</span>
                      {hoveredCell?.r === ri && hoveredCell?.f === fi && val > 0 && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-bg-card border border-str-default rounded-lg px-2 py-1 text-[12px] text-txt-main whitespace-nowrap z-10">
                          R={ri + 1}, F={fi + 1}: {val} clientes
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 ml-[90px]">
            <span className="text-[11px] text-txt-muted">Menos</span>
            {[0, 3, 8, 14, 20, 25].map(v => (
              <div key={v} className="w-5 h-3 rounded-sm" style={{ backgroundColor: getCellColor(v) }} />
            ))}
            <span className="text-[11px] text-txt-muted">Mais</span>
          </div>
        </div>

        {/* Segment summary */}
        <div className="w-[260px] border-l border-str-default pl-4">
          <p className="text-txt-secondary text-[14px] mb-3 font-semibold">Segmentos</p>
          <div className="flex flex-col gap-2">
            {rfmSegments.map(seg => (
              <div key={seg.segment} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[13px] text-txt-main truncate">{seg.segment}</span>
                    <span className="text-[13px] text-txt-secondary tabular-nums ml-2">{seg.count}</span>
                  </div>
                  <span className="text-[11px] text-txt-muted tabular-nums">{formatCurrency(seg.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
