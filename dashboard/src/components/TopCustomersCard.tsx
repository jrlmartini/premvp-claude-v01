import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { topCustomers } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/lib/utils'

export function TopCustomersCard() {
  const maxRevenue = topCustomers[0].revenue

  return (
    <Card className="col-span-6 row-span-5 overflow-hidden">
      <CardHeader>
        <CardTitle>Top 10 clientes (YTD)</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[288px] pr-4">
        <table className="w-full border-separate border-spacing-y-0">
          <thead>
            <tr className="text-txt-secondary text-[16px] text-left">
              <th className="pb-2 font-normal w-8">#</th>
              <th className="pb-2 font-normal">Cliente</th>
              <th className="pb-2 font-normal text-right">Receita</th>
              <th className="pb-2 font-normal text-right w-16">%</th>
              <th className="pb-2 font-normal w-32" />
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer, i) => (
              <tr key={customer.rank} className={`${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-main'} border-y-[0.5px] border-transparent hover:border-str-hover transition-colors`}>
                <td className="py-2 text-txt-muted tabular-nums">{customer.rank}</td>
                <td className="py-2 text-txt-main">{customer.name}</td>
                <td className="py-2 text-txt-main text-right tabular-nums font-semibold">{formatCurrency(customer.revenue)}</td>
                <td className="py-2 text-txt-secondary text-right tabular-nums">{formatPercent(customer.share)}</td>
                <td className="py-2 pl-3">
                  <div className="h-2 rounded-full bg-str-default overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(customer.revenue / maxRevenue) * 100}%`, backgroundColor: i < 3 ? 'var(--color-chart-1)' : i < 6 ? 'var(--color-chart-2)' : 'var(--color-chart-3)' }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
