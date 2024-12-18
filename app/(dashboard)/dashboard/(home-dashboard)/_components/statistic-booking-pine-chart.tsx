"use client";

import { Pie, PieChart, Label } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IStatisticBooking } from "@/features/statistic/types/statistic-booking-type";

interface StatisticbookingPineChartProps {
  data: IStatisticBooking[];
}

export function StatisticbookingPineChart({
  data,
}: StatisticbookingPineChartProps) {
  const totalInProcessBookings = data[0].totalInProcessBookings;
  const totalCancelBookings = data[0].totalCancelBookings;
  const totalBookings = data[0].totalBookings;
  const totalBookingCompleted = totalBookings - totalCancelBookings - totalInProcessBookings;

  const chartData = [
    {
      browser: "totalInProcessBookings",
      visitors: totalInProcessBookings,
      fill: "var(--color-totalInProcessBookings)",
    },
    {
      browser: "totalCancelBookings",
      visitors: totalCancelBookings,
      fill: "var(--color-totalCancelBookings)",
    },
    {
      browser: "totalBookingCompleted",
      visitors: totalBookingCompleted,
      fill: "var(--color-totalBookingCompleted)", 
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    totalInProcessBookings: {
      label: "Tổng đơn thực hiện",
      color: "hsl(240, 100%, 70%)",
    },
    totalCancelBookings: {
      label: "Tổng đơn hủy",
      color: "hsl(0, 100%, 50%)",
    },
    totalBookingCompleted: {
      label: "Tổng đơn hoàn thành",
      color: "hsl(120, 100%, 50%)", 
    },
  } satisfies ChartConfig;

  if (data[0].totalBookings === 0) {
    return (
      <Card className="flex justify-center items-center h-[320px]">
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground">0</p>
          <p className="text-2xl text-muted-foreground">không có đơn</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex">
      <CardContent className="flex-1 pb-0  h-[320px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px]"
        >
          <PieChart className="mt-8">
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={70}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data[0].totalBookings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tổng số lượng đơn
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col justify-center p-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <span>
            {chartConfig.totalInProcessBookings.label}:{" "}
            {data[0].totalInProcessBookings}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <span>
            {chartConfig.totalCancelBookings.label}:{" "}
            {data[0].totalCancelBookings}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2"></div> {/* Màu cho tổng đơn hoàn thành */}
          <span>
            {chartConfig.totalBookingCompleted.label}:{" "}
            {totalBookingCompleted}
          </span>
        </div>
      </div>
    </Card>
  );
}
