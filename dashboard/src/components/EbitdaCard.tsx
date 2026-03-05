import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ebitdaData } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function EbitdaCard() {
  const chartData = ebitdaData.monthly.map((d, i) => ({
    month: d.month,
    'EBITDA mensal': d.value,
    'Acumulado': ebitdaData.accumulatedMonthly[i].value,
    'Margem': d.margin,
  }))

  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <CardTitle>EBITDA acumulado YTD</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-txt-secondary text-[14px] mb-1">YTD acumulado</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(ebitdaData.ytdAccrued)}</p>
          </div>
          <div>
            <p className="text-txt-secondary text-[14px] mb-1">Margem EBITDA</p>
            <p className="text-[30px] font-bold tabular-nums text-st-success">{formatPercent(ebitdaData.margin)}</p>
          </div>
        </div>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <XAxis dataKey="month" tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={{ stroke: '#214059' }} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} domain={[30, 45]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#071724', border: '1px solid #214059', borderRadius: 8, color: '#f2f2f2', fontSize: 14 }}
                formatter={(value, name) => {
                  if (name === 'Margem') return [formatPercent(Number(value)), String(name)]
                  return [formatCurrency(Number(value)), String(name)]
                }}
                labelStyle={{ color: '#c1cdd9' }}
              />
              <Bar yAxisId="left" dataKey="EBITDA mensal" fill="#275fc1" radius={[4, 4, 0, 0]} maxBarSize={36} />
              <Line yAxisId="left" type="monotone" dataKey="Acumulado" stroke="#19c2b8" strokeWidth={2} dot={{ fill: '#19c2b8', r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="Margem" stroke="#f2c14e" strokeWidth={2} dot={{ fill: '#f2c14e', r: 4 }} strokeDasharray="5 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 text-[12px] text-txt-muted justify-center">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#275fc1' }} /> EBITDA mensal</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ backgroundColor: '#19c2b8' }} /> Acumulado</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded border-dashed border-t-2" style={{ borderColor: '#f2c14e' }} /> Margem %</span>
        </div>
      </CardContent>
    </Card>
  )
}
