import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { arAging } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const barColors = ['#22A87e', '#275fc1', '#f2c14e', '#e45757', '#fb7185']

export function ArAgingCard() {
  const total = arAging.reduce((sum, a) => sum + a.value, 0)

  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <div className="flex items-baseline justify-between">
          <CardTitle>Aging de recebíveis</CardTitle>
          <span className="text-[14px] text-txt-secondary tabular-nums">Total: {formatCurrency(total)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={arAging} layout="vertical">
              <XAxis type="number" tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="range" tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip
                contentStyle={{ backgroundColor: '#071724', border: '1px solid #214059', borderRadius: 8, color: '#f2f2f2', fontSize: 14 }}
                formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                labelStyle={{ color: '#c1cdd9' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
                {arAging.map((_, i) => <Cell key={i} fill={barColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-2">
          {arAging.map((item, i) => (
            <div key={item.range} className="flex-1 text-center">
              <div className="h-1 rounded-full mb-1" style={{ backgroundColor: barColors[i] }} />
              <p className="text-[11px] text-txt-muted">{item.range}</p>
              <p className="text-[13px] text-txt-main tabular-nums font-semibold">{formatPercent(item.percentage)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
