
import React from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Users, Clock, AlertCircle, CheckCircle } from "lucide-react";

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
      <StatCard
        title="Total Employees"
        value="124"
        description="Active employees in the system"
        icon={<Users className="h-4 w-4" />}
        trend="up"
        trendValue="4% from last month"
      />
      <StatCard
        title="On Time Today"
        value="98%"
        description="Employees who checked in on time"
        icon={<Clock className="h-4 w-4" />}
        trend="up"
        trendValue="2% from yesterday"
      />
      <StatCard
        title="Missed Punches"
        value="12"
        description="Punches missed today"
        icon={<AlertCircle className="h-4 w-4" />}
        trend="down"
        trendValue="3% from yesterday"
      />
      <StatCard
        title="Attendance Rate"
        value="96.5%"
        description="Overall attendance this month"
        icon={<CheckCircle className="h-4 w-4" />}
        trend="neutral"
        trendValue="Same as last month"
      />
    </div>
  );
}
