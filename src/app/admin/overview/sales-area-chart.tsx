'use client'

import ProductPrice from '@/components/shared/product/product-price'
import { Card, CardContent } from '@/components/ui/card'
import useColorStore from '@/hooks/use-color-store'
import { formatDateTime } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}

interface CustomXAxisTickProps {
  x?: number
  y?: number
  payload?: { value: string }
}

interface SalesData {
  date: string
  totalSales: number
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className='p-2'>
          <p>{label && formatDateTime(new Date(label)).dateOnly}</p>
          <p className='text-primary text-xl'>
            <ProductPrice price={payload[0].value} plain />
          </p>
        </CardContent>
      </Card>
    )
  }
  return null
}

const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({ x, y, payload }) => {
  return (
    <text x={x} y={(y || 0) + 10} textAnchor='left' fill='#666' className='text-xs'>
      {payload?.value && formatDateTime(new Date(payload.value)).dateOnly}
      {/* {`${payload.value.split('/')[1]}/${payload.value.split('/')[2]}`} */}
    </text>
  )
}
const STROKE_COLORS: { [key: string]: { [key: string]: string } } = {
  Red: { light: '#dc2626', dark: '#ef4444' },
  Violet: { light: '#8b5cf6', dark: '#a855f7' },
  Gold: { light: '#d4af37', dark: '#eab308' },
}

export default function SalesAreaChart({ data }: { data: SalesData[] }) {
  const { theme } = useTheme()
  const { color } = useColorStore(theme || 'light')

  // Light fill colors that match the stroke colors
  const FILL_COLORS: { [key: string]: { [key: string]: string } } = {
    Red: { light: '#fecaca', dark: '#7f1d1d' },
    Violet: { light: '#e4d4f4', dark: '#581c87' },
    Gold: { light: '#fef3c7', dark: '#92400e' },
  }

  const currentTheme = theme || 'light'
  const strokeColor = STROKE_COLORS[color.name]?.[currentTheme] || STROKE_COLORS.Gold[currentTheme]
  const fillColor = FILL_COLORS[color.name]?.[currentTheme] || FILL_COLORS.Gold[currentTheme]

  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={data}>
        <CartesianGrid horizontal={true} vertical={false} stroke='' />
        <XAxis dataKey='date' tick={<CustomXAxisTick />} interval={3} />
        <YAxis fontSize={12} tickFormatter={(value: number) => `$${value}`} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type='monotone'
          dataKey='totalSales'
          stroke={strokeColor}
          strokeWidth={2}
          fill={fillColor}
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}