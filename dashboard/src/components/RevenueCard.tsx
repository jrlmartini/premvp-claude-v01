import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { revenueData } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { chartAxisTick, chartColor, tooltipLabelStyle, tooltipStyle } from '@/lib/chartTheme'

function StatusIndicator({ actual, goal }: { actual: number; goal: number }) {
  const pct = ((actual / goal) * 100) - 100
  const isPositive = pct >= 0

  return (
    <span className={`inline-flex items-center gap-2 text-[16px] font-semibold ${isPositive ? 'text-st-success' : 'text-st-danger'}`}>
      {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      {formatPercent(Math.abs(pct))} vs meta
    </span>
  )
}

const chartData = revenueData.monthlyBreakdown.map((d) => ({
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
            <p className="text-txt-secondary text-[16px] mb-2">MTD</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(revenueData.mtd.actual)}</p>
            <StatusIndicator actual={revenueData.mtd.actual} goal={revenueData.mtd.runrateGoal} />
            <div className="mt-2 h-2 rounded-full bg-str-default overflow-hidden">
              <div className="h-full rounded-full bg-chart-1 transition-all" style={{ width: `${Math.min(mtdPct, 100)}%` }} />
            </div>
          </div>
          <div>
            <p className="text-txt-secondary text-[16px] mb-2">YTD</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(revenueData.ytd.actual)}</p>
            <StatusIndicator actual={revenueData.ytd.actual} goal={revenueData.ytd.runrateGoal} />
            <div className="mt-2 h-2 rounded-full bg-str-default overflow-hidden">
              <div className="h-full rounded-full bg-chart-2 transition-all" style={{ width: `${Math.min(ytdPct, 100)}%` }} />
            </div>
          </div>
          <div>
            <p className="text-txt-secondary text-[16px] mb-2">Média mensal</p>
            <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(revenueData.averageMonthly)}</p>
            <span className="text-txt-muted text-[16px]">últimos 3 meses</span>
          </div>
        </div>
        <div className="h-36 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={8}>
              <XAxis dataKey="month" tick={chartAxisTick} axisLine={{ stroke: chartColor.axisLine }} tickLine={false} />
              <YAxis tick={chartAxisTick} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [formatCurrency(Number(value)), '']} labelStyle={tooltipLabelStyle} />
              <Bar dataKey="Meta" radius={[8, 8, 0, 0]} maxBarSize={32}>
                {chartData.map((_, i) => <Cell key={i} fill={chartColor.axisLine} />)}
              </Bar>
              <Bar dataKey="Realizado" radius={[8, 8, 0, 0]} maxBarSize={32}>
                {chartData.map((_, i) => <Cell key={i} fill={chartColor.chart1} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
