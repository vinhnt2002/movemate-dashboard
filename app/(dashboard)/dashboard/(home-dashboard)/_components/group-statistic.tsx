"use client";
import { IStatisticGroup } from "@/features/statistic/types/statistic-group-type";
import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface StatisticGroupProps {
  data: IStatisticGroup | null; // Nhận dữ liệu từ API
}

const chartConfig: ChartConfig = {
  totalUsers: {
    label: "Tổng số người dùng",
  },
};

export function StatisticGroup({ data }: StatisticGroupProps) {
  if (!data || !data.groups || data.groups.length === 0) {
    return (
      <Card className="flex justify-center items-center h-[320px]">
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground">Không có dữ liệu</p>
        </div>
      </Card>
    );
  }

  // Chuyển đổi dữ liệu từ API thành dữ liệu cho biểu đồ
  const chartData = data.groups.map((group) => ({
    month: group.groupName,
    driver: group.usersByRole.find((role) => role.roleName === "Driver")?.userCount || 0,
    porter: group.usersByRole.find((role) => role.roleName === "Porter")?.userCount || 0,
    reviewer: group.usersByRole.find((role) => role.roleName === "Reviewer")?.userCount || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple Roles</CardTitle>
        <CardDescription>Thống kê các vai trò của tổ</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="driver" fill="var(--color-driver)" radius={4} />
            <Bar dataKey="porter" fill="var(--color-porter)" radius={4} />
            <Bar dataKey="reviewer" fill="var(--color-reviewer)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
  );
}

export default StatisticGroup;