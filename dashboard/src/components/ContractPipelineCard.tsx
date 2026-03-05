import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { contractPipeline } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

const stageColors = ['#275fc1', '#2aa9e0', '#19c2b8', '#22A87e', '#34d399']

export function ContractPipelineCard() {
  const totalValue = contractPipeline.reduce((sum, s) => sum + s.value, 0)
  const maxValue = contractPipeline[0].value

  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <div className="flex items-baseline justify-between">
          <CardTitle>Pipeline de contratos</CardTitle>
          <span className="text-[14px] text-txt-secondary tabular-nums">{formatCurrency(totalValue)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {contractPipeline.map((stage, i) => {
          const widthPct = (stage.value / maxValue) * 100
          return (
            <div key={stage.stage} className="flex items-center gap-3">
              <div className="w-[90px] text-[13px] text-txt-secondary shrink-0">{stage.stage}</div>
              <div className="flex-1 h-8 bg-bg-main rounded-[6px] overflow-hidden relative">
                <div
                  className="h-full rounded-[6px] flex items-center px-3 transition-all"
                  style={{ width: `${widthPct}%`, backgroundColor: stageColors[i] }}
                >
                  <span className="text-[12px] font-semibold text-txt-main tabular-nums whitespace-nowrap">
                    {formatCurrency(stage.value)}
                  </span>
                </div>
              </div>
              <div className="w-8 text-right">
                <span className="text-[14px] font-semibold tabular-nums text-txt-main">{stage.count}</span>
              </div>
            </div>
          )
        })}
        <div className="flex items-center gap-2 text-[12px] text-txt-muted mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-st-success" />
          <span>Taxa de conversão estimada: 16,7%</span>
        </div>
      </CardContent>
    </Card>
  )
}
