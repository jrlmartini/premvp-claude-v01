import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cashPosition } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { chartAxisTick, chartColor, tooltipLabelStyle, tooltipStyle } from '@/lib/chartTheme'

export function CashPositionCard() {
  return (
    <Card className="col-span-4 row-span-5">
      <CardHeader>
        <CardTitle>Posição de caixa</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="text-[30px] font-bold tabular-nums text-txt-main">{formatCurrency(cashPosition.current)}</p>
          <span className="inline-flex items-center gap-2 text-[16px] font-semibold text-st-success">
            <TrendingUp size={16} />
            +{formatPercent(cashPosition.change)} vs mês anterior
          </span>
        </div>
        <div className="flex gap-4 text-[16px]">
          {cashPosition.breakdown.map((item) => (
            <div key={item.category} className="flex-1">
              <p className="text-txt-muted mb-1">{item.category}</p>
              <p className="text-txt-main tabular-nums font-semibold">{formatCurrency(item.value)}</p>
            </div>
          ))}
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cashPosition.trend}>
              <defs>
                <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor.chart2} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chartColor.chart2} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={chartAxisTick} axisLine={{ stroke: chartColor.axisLine }} tickLine={false} />
              <YAxis tick={chartAxisTick} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(0)}M`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [formatCurrency(Number(value)), 'Caixa']} labelStyle={tooltipLabelStyle} />
              <Area type="monotone" dataKey="value" stroke={chartColor.chart2} strokeWidth={2} fill="url(#cashGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
