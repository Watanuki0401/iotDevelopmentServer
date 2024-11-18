"use client"

import React from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type test = {
  _timeJP: string;
  result: string;
  table: number;
  _start: string;
  _stop: string;
  _time: string;
  _value: number;
  _field: string;
  _measurement: string;
}

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig

export function UserChartComponent({ data, min, max, deviceName }: {data: test[], min: number, max: number, deviceName: string}) {

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>デバイス:{deviceName}の推移</CardTitle>
        <CardDescription>センサデータの過去10分間の値です</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_timeJP" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="_value" stroke="var(--color-temperature)" name="売上" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}