import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { arAging } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { chartAxisTick, chartColor, tooltipLabelStyle, tooltipStyle } from '@/lib/chartTheme'

const barColors = [chartColor.chart4, chartColor.chart1, chartColor.chart6, chartColor.chart7, chartColor.success]

export function ArAgingCard() {
  const total = arAging.reduce((sum, a) => sum + a.value, 0)

  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <div className="flex items-baseline justify-between gap-2">
          <CardTitle>Aging de recebíveis</CardTitle>
          <span className="text-[16px] text-txt-secondary tabular-nums">Total: {formatCurrency(total)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={arAging} layout="vertical">
              <XAxis type="number" tick={chartAxisTick} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="range" tick={chartAxisTick} axisLine={false} tickLine={false} width={72} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                labelStyle={tooltipLabelStyle}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={24}>
                {arAging.map((_, i) => <Cell key={i} fill={barColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-2">
          {arAging.map((item, i) => (
            <div key={item.range} className="flex-1 text-center">
              <div className="h-1 rounded-full mb-1" style={{ backgroundColor: barColors[i] }} />
              <p className="text-[16px] text-txt-muted">{item.range}</p>
              <p className="text-[16px] text-txt-main tabular-nums font-semibold">{formatPercent(item.percentage)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
