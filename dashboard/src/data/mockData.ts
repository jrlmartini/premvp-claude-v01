// Mock data for Conatus Environmental Technologies Executive Dashboard
// All values in BRL (Brazilian Real)

export const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

// Current date context: March 2026
export const currentMonth = 2 // March (0-indexed)
export const currentYear = 2026

// Revenue data
export const revenueData = {
  mtd: {
    actual: 2_850_000,
    runrateGoal: 3_200_000,
    lastYear: 2_400_000,
  },
  ytd: {
    actual: 8_750_000,
    runrateGoal: 9_600_000,
    lastYear: 7_100_000,
  },
  averageMonthly: 2_916_000,
  monthlyBreakdown: [
    { month: 'Jan', actual: 2_980_000, goal: 3_200_000 },
    { month: 'Fev', actual: 2_920_000, goal: 3_200_000 },
    { month: 'Mar', actual: 2_850_000, goal: 3_200_000 },
  ],
}

// Top 10 customers
export const topCustomers = [
  { rank: 1, name: 'Petrobras S.A.', revenue: 1_450_000, share: 16.6 },
  { rank: 2, name: 'Vale S.A.', revenue: 1_120_000, share: 12.8 },
  { rank: 3, name: 'Suzano Papel e Celulose', revenue: 980_000, share: 11.2 },
  { rank: 4, name: 'BRF S.A.', revenue: 870_000, share: 9.9 },
  { rank: 5, name: 'Klabin S.A.', revenue: 760_000, share: 8.7 },
  { rank: 6, name: 'Ambev S.A.', revenue: 650_000, share: 7.4 },
  { rank: 7, name: 'JBS S.A.', revenue: 540_000, share: 6.2 },
  { rank: 8, name: 'CPFL Energia', revenue: 430_000, share: 4.9 },
  { rank: 9, name: 'Natura &Co', revenue: 380_000, share: 4.3 },
  { rank: 10, name: 'Braskem S.A.', revenue: 320_000, share: 3.7 },
]

// Cash position
export const cashPosition = {
  current: 12_340_000,
  previousMonth: 11_890_000,
  change: 3.8,
  breakdown: [
    { category: 'Caixa e equivalentes', value: 5_200_000 },
    { category: 'Aplicações de curto prazo', value: 4_800_000 },
    { category: 'Recebíveis líquidos', value: 2_340_000 },
  ],
  trend: [
    { month: 'Out', value: 10_500_000 },
    { month: 'Nov', value: 11_200_000 },
    { month: 'Dez', value: 11_890_000 },
    { month: 'Jan', value: 11_500_000 },
    { month: 'Fev', value: 12_100_000 },
    { month: 'Mar', value: 12_340_000 },
  ],
}

// Operational cashflow
export const operationalCashflow = {
  mtd: {
    generation: 890_000,
    goal: 1_000_000,
  },
  ytd: {
    generation: 2_650_000,
    goal: 3_000_000,
  },
  monthlyBreakdown: [
    { month: 'Jan', inflow: 3_800_000, outflow: 2_950_000, net: 850_000 },
    { month: 'Fev', inflow: 3_650_000, outflow: 2_740_000, net: 910_000 },
    { month: 'Mar', inflow: 3_500_000, outflow: 2_610_000, net: 890_000 },
  ],
}

// EBITDA data
export const ebitdaData = {
  ytdAccrued: 3_420_000,
  margin: 39.1,
  monthly: [
    { month: 'Jan', value: 1_180_000, margin: 39.6 },
    { month: 'Fev', value: 1_150_000, margin: 39.4 },
    { month: 'Mar', value: 1_090_000, margin: 38.2 },
  ],
  accumulatedMonthly: [
    { month: 'Jan', value: 1_180_000 },
    { month: 'Fev', value: 2_330_000 },
    { month: 'Mar', value: 3_420_000 },
  ],
}

// RFM Analysis data
// R (Recency): 1=recent, 5=long ago
// F (Frequency): 1=rare, 5=frequent
// M (Monetary): 1=low, 5=high
export const rfmData = [
  { r: 1, f: 5, m: 5, count: 8, label: 'Campeões' },
  { r: 1, f: 4, m: 5, count: 12, label: 'Clientes leais' },
  { r: 1, f: 5, m: 4, count: 6, label: 'Clientes leais' },
  { r: 1, f: 3, m: 5, count: 5, label: 'Potenciais leais' },
  { r: 1, f: 4, m: 4, count: 10, label: 'Potenciais leais' },
  { r: 2, f: 5, m: 5, count: 4, label: 'Clientes leais' },
  { r: 2, f: 4, m: 4, count: 9, label: 'Potenciais leais' },
  { r: 2, f: 3, m: 3, count: 15, label: 'Precisam de atenção' },
  { r: 2, f: 2, m: 4, count: 7, label: 'Precisam de atenção' },
  { r: 3, f: 3, m: 3, count: 18, label: 'Em risco' },
  { r: 3, f: 2, m: 2, count: 20, label: 'Em risco' },
  { r: 3, f: 1, m: 3, count: 11, label: 'Em risco' },
  { r: 4, f: 2, m: 2, count: 14, label: 'Hibernando' },
  { r: 4, f: 1, m: 1, count: 22, label: 'Hibernando' },
  { r: 4, f: 1, m: 2, count: 16, label: 'Hibernando' },
  { r: 5, f: 1, m: 1, count: 25, label: 'Perdidos' },
  { r: 5, f: 2, m: 1, count: 13, label: 'Perdidos' },
  { r: 5, f: 1, m: 2, count: 10, label: 'Perdidos' },
  { r: 1, f: 1, m: 5, count: 3, label: 'Novos valiosos' },
  { r: 1, f: 2, m: 3, count: 8, label: 'Novos promissores' },
  { r: 1, f: 1, m: 2, count: 12, label: 'Novos recentes' },
  { r: 2, f: 1, m: 1, count: 9, label: 'Prestes a hibernar' },
]

// RFM segment summary for the heatmap
export const rfmSegments = [
  { segment: 'Campeões', count: 8, revenue: 2_800_000, color: 'var(--color-st-success)' },
  { segment: 'Clientes leais', count: 22, revenue: 4_200_000, color: 'var(--color-chart-4)' },
  { segment: 'Potenciais leais', count: 20, revenue: 2_100_000, color: 'var(--color-chart-3)' },
  { segment: 'Novos valiosos', count: 3, revenue: 450_000, color: 'var(--color-chart-1)' },
  { segment: 'Novos promissores', count: 8, revenue: 380_000, color: 'var(--color-chart-5)' },
  { segment: 'Novos recentes', count: 12, revenue: 240_000, color: 'var(--color-chart-2)' },
  { segment: 'Precisam de atenção', count: 31, revenue: 1_900_000, color: 'var(--color-chart-6)' },
  { segment: 'Em risco', count: 49, revenue: 1_650_000, color: 'var(--color-chart-7)' },
  { segment: 'Hibernando', count: 52, revenue: 780_000, color: 'var(--color-chart-other)' },
  { segment: 'Perdidos', count: 48, revenue: 320_000, color: 'var(--color-txt-muted)' },
]

// Accounts receivable aging
export const arAging = [
  { range: 'A vencer', value: 3_200_000, percentage: 45.1 },
  { range: '1-30 dias', value: 1_800_000, percentage: 25.4 },
  { range: '31-60 dias', value: 950_000, percentage: 13.4 },
  { range: '61-90 dias', value: 620_000, percentage: 8.7 },
  { range: '> 90 dias', value: 530_000, percentage: 7.5 },
]

// Contract pipeline
export const contractPipeline = [
  { stage: 'Prospecção', count: 18, value: 4_500_000 },
  { stage: 'Qualificação', count: 12, value: 3_200_000 },
  { stage: 'Proposta', count: 8, value: 2_800_000 },
  { stage: 'Negociação', count: 5, value: 1_900_000 },
  { stage: 'Fechamento', count: 3, value: 1_200_000 },
]
