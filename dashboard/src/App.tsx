import { DashboardHeader } from '@/components/DashboardHeader'
import { KpiSummaryBar } from '@/components/KpiSummaryBar'
import { RevenueCard } from '@/components/RevenueCard'
import { TopCustomersCard } from '@/components/TopCustomersCard'
import { CashPositionCard } from '@/components/CashPositionCard'
import { OperationalCashflowCard } from '@/components/OperationalCashflowCard'
import { EbitdaCard } from '@/components/EbitdaCard'
import { RfmHeatmapCard } from '@/components/RfmHeatmapCard'
import { ArAgingCard } from '@/components/ArAgingCard'
import { ContractPipelineCard } from '@/components/ContractPipelineCard'

export default function App() {
  return (
    <div className="min-h-screen bg-bg-main">
      <DashboardHeader />
      <KpiSummaryBar />
      <main className="px-6 pb-6">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: '64px',
          }}
        >
          {/* Row 1: Revenue + Top Customers */}
          <RevenueCard />
          <TopCustomersCard />

          {/* Row 2: Cash Position + Operational Cashflow + EBITDA */}
          <CashPositionCard />
          <OperationalCashflowCard />
          <EbitdaCard />

          {/* Row 3: RFM Heatmap + Contract Pipeline */}
          <RfmHeatmapCard />
          <ContractPipelineCard />

          {/* Row 4: AR Aging */}
          <ArAgingCard />
        </div>
      </main>
    </div>
  )
}
