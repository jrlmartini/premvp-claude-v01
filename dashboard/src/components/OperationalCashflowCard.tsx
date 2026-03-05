import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { operationalCashflow } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

export function OperationalCashflowCard() {
  const mtdPct = (operationalCashflow.mtd.generation / operationalCashflow.mtd.goal) * 100
  const ytdPct = (operationalCashflow.ytd.generation / operationalCashflow.ytd.goal) * 100

  const chartData = operationalCashflow.monthlyBreakdown.map(d => ({
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
            <p className="text-txt-secondary text-[14px] mb-1">Geração MTD</p>
            <p className="text-[24px] font-bold tabular-nums text-txt-main">{formatCurrency(operationalCashflow.mtd.generation)}</p>
            <span className={`text-[13px] ${mtdPct >= 100 ? 'text-st-success' : 'text-st-warning'}`}>
              {formatPercent(mtdPct)} da meta
            </span>
          </div>
          <div>
            <p className="text-txt-secondary text-[14px] mb-1">Geração YTD</p>
            <p className="text-[24px] font-bold tabular-nums text-txt-main">{formatCurrency(operationalCashflow.ytd.generation)}</p>
            <span className={`text-[13px] ${ytdPct >= 100 ? 'text-st-success' : 'text-st-warning'}`}>
              {formatPercent(ytdPct)} da meta
            </span>
          </div>
        </div>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} stackOffset="sign">
              <XAxis dataKey="month" tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={{ stroke: '#214059' }} tickLine={false} />
              <YAxis tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#071724', border: '1px solid #214059', borderRadius: 8, color: '#f2f2f2', fontSize: 14 }}
                formatter={(value) => [formatCurrency(Math.abs(Number(value))), '']}
                labelStyle={{ color: '#c1cdd9' }}
              />
              <ReferenceLine y={0} stroke="#214059" />
              <Bar dataKey="Entrada" fill="#22A87e" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="Saída" fill="#e45757" radius={[0, 0, 4, 4]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
