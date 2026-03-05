import { revenueData, cashPosition, ebitdaData, operationalCashflow } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Wallet, Activity } from 'lucide-react'

interface KpiPillProps {
  icon: React.ReactNode
  label: string
  value: string
  change?: { value: number; positive: boolean }
}

function KpiPill({ icon, label, value, change }: KpiPillProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-4 rounded-md bg-bg-card border-[0.5px] border-str-default hover:border-[1.5px] hover:border-str-hover transition-colors">
      <div className="text-chart-1">{icon}</div>
      <div>
        <p className="text-[16px] text-txt-muted leading-none mb-1">{label}</p>
        <p className="text-[20px] font-semibold tabular-nums text-txt-main leading-tight">{value}</p>
      </div>
      {change && (
        <span className={`flex items-center gap-1 text-[16px] font-semibold ml-1 ${change.positive ? 'text-st-success' : 'text-st-danger'}`}>
          {change.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {formatPercent(Math.abs(change.value))}
        </span>
      )}
    </div>
  )
}

export function KpiSummaryBar() {
  const revYtdVsGoal = ((revenueData.ytd.actual / revenueData.ytd.runrateGoal) - 1) * 100
  const cashChange = cashPosition.change
  const opCfYtdVsGoal = ((operationalCashflow.ytd.generation / operationalCashflow.ytd.goal) - 1) * 100

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4 mb-2">
      <KpiPill icon={<DollarSign size={20} />} label="Receita YTD" value={formatCurrency(revenueData.ytd.actual)} change={{ value: revYtdVsGoal, positive: revYtdVsGoal >= 0 }} />
      <KpiPill icon={<Wallet size={20} />} label="Caixa atual" value={formatCurrency(cashPosition.current)} change={{ value: cashChange, positive: cashChange >= 0 }} />
      <KpiPill icon={<Activity size={20} />} label="FCO YTD" value={formatCurrency(operationalCashflow.ytd.generation)} change={{ value: opCfYtdVsGoal, positive: opCfYtdVsGoal >= 0 }} />
      <KpiPill icon={<BarChart3 size={20} />} label="EBITDA YTD" value={formatCurrency(ebitdaData.ytdAccrued)} change={{ value: ebitdaData.margin, positive: true }} />
    </div>
  )
}
