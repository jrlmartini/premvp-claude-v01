import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { contractPipeline } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

const stageColors = ['bg-chart-1', 'bg-chart-3', 'bg-chart-2', 'bg-chart-4', 'bg-st-success']

export function ContractPipelineCard() {
  const totalValue = contractPipeline.reduce((sum, s) => sum + s.value, 0)
  const maxValue = contractPipeline[0].value

  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <div className="flex items-baseline justify-between gap-2">
          <CardTitle>Pipeline de contratos</CardTitle>
          <span className="text-[16px] text-txt-secondary tabular-nums">{formatCurrency(totalValue)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {contractPipeline.map((stage, i) => {
          const widthPct = (stage.value / maxValue) * 100
          return (
            <div key={stage.stage} className="flex items-center gap-4">
              <div className="w-24 text-[16px] text-txt-secondary shrink-0">{stage.stage}</div>
              <div className="flex-1 h-8 bg-bg-main rounded-sm overflow-hidden relative">
                <div className={`h-full rounded-sm flex items-center px-3 transition-all ${stageColors[i]}`} style={{ width: `${widthPct}%` }}>
                  <span className="text-[16px] font-semibold text-txt-main tabular-nums whitespace-nowrap">{formatCurrency(stage.value)}</span>
                </div>
              </div>
              <div className="w-8 text-right">
                <span className="text-[16px] font-semibold tabular-nums text-txt-main">{stage.count}</span>
              </div>
            </div>
          )
        })}
        <div className="flex items-center gap-2 text-[16px] text-txt-muted mt-2">
          <span className="inline-block w-3 h-3 rounded-full bg-st-success" />
          <span>Taxa de conversão estimada: 16,7%</span>
        </div>
      </CardContent>
    </Card>
  )
}
