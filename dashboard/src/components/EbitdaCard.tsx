import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ebitdaData } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { chartAxisTick, chartColor, tooltipLabelStyle, tooltipStyle } from '@/lib/chartTheme'

export function EbitdaCard() {
  const chartData = ebitdaData.monthly.map((d, i) => ({
    month: d.month,
    'EBITDA mensal': d.value,
    Acumulado: ebitdaData.accumulatedMonthly[i].value,
    Margem: d.margin,
  }))

  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <CardTitle>EBITDA acumulado YTD</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-txt-secondary text-[16px] mb-2">YTD acumulado</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(ebitdaData.ytdAccrued)}</p>
          </div>
          <div>
            <p className="text-txt-secondary text-[16px] mb-2">Margem EBITDA</p>
            <p className="text-[30px] font-bold tabular-nums text-st-success">{formatPercent(ebitdaData.margin)}</p>
          </div>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <XAxis dataKey="month" tick={chartAxisTick} axisLine={{ stroke: chartColor.axisLine }} tickLine={false} />
              <YAxis yAxisId="left" tick={chartAxisTick} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <YAxis yAxisId="right" orientation="right" tick={chartAxisTick} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} domain={[30, 45]} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (name === 'Margem') return [formatPercent(Number(value)), String(name)]
                  return [formatCurrency(Number(value)), String(name)]
                }}
                labelStyle={tooltipLabelStyle}
              />
              <Bar yAxisId="left" dataKey="EBITDA mensal" fill={chartColor.chart1} radius={[8, 8, 0, 0]} maxBarSize={32} />
              <Line yAxisId="left" type="monotone" dataKey="Acumulado" stroke={chartColor.chart2} strokeWidth={2} dot={{ fill: chartColor.chart2, r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="Margem" stroke={chartColor.chart6} strokeWidth={2} dot={{ fill: chartColor.chart6, r: 4 }} strokeDasharray="8 8" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 text-[16px] text-txt-muted justify-center">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: chartColor.chart1 }} /> EBITDA mensal</span>
          <span className="flex items-center gap-2"><span className="w-3 h-0.5 rounded" style={{ backgroundColor: chartColor.chart2 }} /> Acumulado</span>
          <span className="flex items-center gap-2"><span className="w-3 h-0.5 rounded border-dashed border-t-2" style={{ borderColor: chartColor.chart6 }} /> Margem %</span>
        </div>
      </CardContent>
    </Card>
  )
}
