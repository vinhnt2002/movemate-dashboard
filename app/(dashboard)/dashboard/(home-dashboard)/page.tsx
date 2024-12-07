import React from "react";
import StatisticFilterDate from "./_components/statistic-filter-date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Truck,
  Gift,
  ClipboardList,
  BarChart3,
  Activity,
} from "lucide-react";

import LeftStatistic from "./_components/left-statistic";
import { getStatisTicTransationCustom } from "@/features/statistic/action/statistic";
import StatisticTransactionLineChart from "./_components/statistic-transaction-line-chart";
export interface SearchParamFilterDashboard {
  shard?: string;
  type?: string;
  isSummary?: boolean;
}

const Dashboard = async ({
  searchParams,
}: {
  searchParams: SearchParamFilterDashboard;
}) => {
  const [statisticTransactionLineData] = await Promise.all([
    getStatisTicTransationCustom(),
  ]);
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="lg:w-1/4 space-y-6">
        <LeftStatistic searchParams={searchParams} />
      </div>

      <div className="lg:w-3/4 space-y-6">
        <div className="flex justify-between items-center pb-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
          </div>
          <StatisticFilterDate searchParams={searchParams} />
        </div>

        {/* Main Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <span>Thống Kê Thu Nhập Theo Thời Gian</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            {/* Main Line/Area Chart Component */}
            <StatisticTransactionLineChart
              data={statisticTransactionLineData.data}
            />
          </CardContent>
        </Card>

        {/* Middle Row - Two Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-indigo-500" />
                <span>Phân Bố Nhân Viên</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              {/* Donut Chart Component */}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-500" />
                <span>Phân Loại Xe</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              {/* Pie Chart Component */}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Three Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-pink-500" />
                <span>Khuyến Mãi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-48">
              {/* Mini Chart Component */}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>Booking Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-48">
              {/* Mini Chart Component */}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5 text-yellow-500" />
                <span>Top Locations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-48">
              {/* Mini Chart Component */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
