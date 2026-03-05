import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { operationalCashflow } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { chartAxisTick, chartColor, tooltipLabelStyle, tooltipStyle } from '@/lib/chartTheme'

export function OperationalCashflowCard() {
  const mtdPct = (operationalCashflow.mtd.generation / operationalCashflow.mtd.goal) * 100
  const ytdPct = (operationalCashflow.ytd.generation / operationalCashflow.ytd.goal) * 100

  const chartData = operationalCashflow.monthlyBreakdown.map((d) => ({
    month: d.month,
    Entrada: d.inflow,
    Saída: -d.outflow,
    Líquido: d.net,
  }))

  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <CardTitle>Fluxo de caixa operacional</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-txt-secondary text-[16px] mb-2">Geração MTD</p>
            <p className="text-[24px] font-bold tabular-nums text-txt-main">{formatCurrency(operationalCashflow.mtd.generation)}</p>
            <span className={`text-[16px] ${mtdPct >= 100 ? 'text-st-success' : 'text-st-warning'}`}>
              {formatPercent(mtdPct)} da meta
            </span>
          </div>
          <div>
            <p className="text-txt-secondary text-[16px] mb-2">Geração YTD</p>
            <p className="text-[24px] font-bold tabular-nums text-txt-main">{formatCurrency(operationalCashflow.ytd.generation)}</p>
            <span className={`text-[16px] ${ytdPct >= 100 ? 'text-st-success' : 'text-st-warning'}`}>
              {formatPercent(ytdPct)} da meta
            </span>
          </div>
        </div>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} stackOffset="sign">
              <XAxis dataKey="month" tick={chartAxisTick} axisLine={{ stroke: chartColor.axisLine }} tickLine={false} />
              <YAxis tick={chartAxisTick} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [formatCurrency(Math.abs(Number(value))), '']}
                labelStyle={tooltipLabelStyle}
              />
              <ReferenceLine y={0} stroke={chartColor.axisLine} />
              <Bar dataKey="Entrada" fill={chartColor.chart4} radius={[8, 8, 0, 0]} maxBarSize={24} />
              <Bar dataKey="Saída" fill={chartColor.chart7} radius={[0, 0, 8, 8]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
