export const chartColor = {
  axisText: 'var(--color-txt-secondary)',
  axisLine: 'var(--color-str-default)',
  tooltipBg: 'var(--color-bg-card)',
  tooltipBorder: '0.5px solid var(--color-str-default)',
  tooltipText: 'var(--color-txt-main)',
  chart1: 'var(--color-chart-1)',
  chart2: 'var(--color-chart-2)',
  chart3: 'var(--color-chart-3)',
  chart4: 'var(--color-chart-4)',
  chart6: 'var(--color-chart-6)',
  chart7: 'var(--color-chart-7)',
  success: 'var(--color-st-success)',
} as const

export const chartAxisTick = { fill: chartColor.axisText, fontSize: 16 }

export const tooltipStyle = {
  backgroundColor: chartColor.tooltipBg,
  border: chartColor.tooltipBorder,
  borderRadius: 8,
  color: chartColor.tooltipText,
  fontSize: 16,
}

export const tooltipLabelStyle = { color: chartColor.axisText }
