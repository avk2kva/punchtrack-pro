
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground/60">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div
            className={cn(
              "mt-2 text-xs font-medium inline-flex items-center px-2 py-0.5 rounded-full",
              trend === "up" && "bg-green-100 text-green-800",
              trend === "down" && "bg-red-100 text-red-800",
              trend === "neutral" && "bg-muted text-muted-foreground"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
