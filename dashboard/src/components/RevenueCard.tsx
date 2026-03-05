import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { revenueData } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

function StatusIndicator({ actual, goal }: { actual: number; goal: number }) {
  const pct = ((actual / goal) * 100) - 100
  const isPositive = pct >= 0
  return (
    <span className={`inline-flex items-center gap-1 text-[14px] font-semibold ${isPositive ? 'text-st-success' : 'text-st-danger'}`}>
      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      {formatPercent(Math.abs(pct))} vs meta
    </span>
  )
}

const chartData = revenueData.monthlyBreakdown.map(d => ({
  month: d.month,
  Realizado: d.actual,
  Meta: d.goal,
}))

export function RevenueCard() {
  const mtdPct = (revenueData.mtd.actual / revenueData.mtd.runrateGoal) * 100
  const ytdPct = (revenueData.ytd.actual / revenueData.ytd.runrateGoal) * 100

  return (
    <Card className="col-span-6 row-span-5">
      <CardHeader>
        <CardTitle>Receita</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-txt-secondary text-[14px] mb-1">MTD</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(revenueData.mtd.actual)}</p>
            <StatusIndicator actual={revenueData.mtd.actual} goal={revenueData.mtd.runrateGoal} />
            <div className="mt-2 h-1.5 rounded-full bg-str-default overflow-hidden">
              <div className="h-full rounded-full bg-chart-1 transition-all" style={{ width: `${Math.min(mtdPct, 100)}%` }} />
            </div>
          </div>
          <div>
            <p className="text-txt-secondary text-[14px] mb-1">YTD</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(revenueData.ytd.actual)}</p>
            <StatusIndicator actual={revenueData.ytd.actual} goal={revenueData.ytd.runrateGoal} />
            <div className="mt-2 h-1.5 rounded-full bg-str-default overflow-hidden">
              <div className="h-full rounded-full bg-chart-2 transition-all" style={{ width: `${Math.min(ytdPct, 100)}%` }} />
            </div>
          </div>
          <div>
            <p className="text-txt-secondary text-[14px] mb-1">Média mensal</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(revenueData.averageMonthly)}</p>
            <span className="text-txt-muted text-[14px]">últimos 3 meses</span>
          </div>
        </div>
        <div className="h-[140px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <XAxis dataKey="month" tick={{ fill: '#c1cdd9', fontSize: 14 }} axisLine={{ stroke: '#214059' }} tickLine={false} />
              <YAxis tick={{ fill: '#c1cdd9', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#071724', border: '1px solid #214059', borderRadius: 8, color: '#f2f2f2', fontSize: 14 }}
                formatter={(value) => [formatCurrency(Number(value)), '']}
                labelStyle={{ color: '#c1cdd9' }}
              />
              <Bar dataKey="Meta" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {chartData.map((_, i) => <Cell key={i} fill="#214059" />)}
              </Bar>
              <Bar dataKey="Realizado" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {chartData.map((_, i) => <Cell key={i} fill="#275fc1" />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
