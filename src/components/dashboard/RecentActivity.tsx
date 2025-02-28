
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ActivityType = "check-in" | "check-out" | "lunch-out" | "lunch-in" | "missed";

interface ActivityItem {
  id: string;
  employeeName: string;
  employeeId: string;
  time: string;
  type: ActivityType;
  deviceName?: string;
}

const activityData: ActivityItem[] = [
  {
    id: "1",
    employeeName: "John Doe",
    employeeId: "EMP001",
    time: "08:02 AM",
    type: "check-in",
    deviceName: "Main Entrance"
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    employeeId: "EMP002",
    time: "08:05 AM",
    type: "check-in",
    deviceName: "Side Entrance"
  },
  {
    id: "3",
    employeeName: "Michael Brown",
    employeeId: "EMP003",
    time: "12:30 PM",
    type: "lunch-out",
    deviceName: "Cafeteria"
  },
  {
    id: "4",
    employeeName: "Sarah Johnson",
    employeeId: "EMP004",
    time: "-",
    type: "missed",
  },
  {
    id: "5",
    employeeName: "David Lee",
    employeeId: "EMP005",
    time: "01:02 PM",
    type: "lunch-in",
    deviceName: "Cafeteria"
  },
  {
    id: "6",
    employeeName: "Emily Wilson",
    employeeId: "EMP006",
    time: "05:01 PM",
    type: "check-out",
    deviceName: "Main Entrance"
  },
];

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case "check-in":
      return "bg-green-100 text-green-800";
    case "check-out":
      return "bg-blue-100 text-blue-800";
    case "lunch-out":
      return "bg-amber-100 text-amber-800";
    case "lunch-in":
      return "bg-emerald-100 text-emerald-800";
    case "missed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getActivityLabel = (type: ActivityType) => {
  switch (type) {
    case "check-in":
      return "Check In";
    case "check-out":
      return "Check Out";
    case "lunch-out":
      return "Lunch Out";
    case "lunch-in":
      return "Lunch In";
    case "missed":
      return "Missed";
    default:
      return type;
  }
};

export function RecentActivity() {
  return (
    <Card className="col-span-1 md:col-span-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activityData.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                    {activity.employeeName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{activity.employeeId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activity.deviceName && (
                    <span className="text-xs text-muted-foreground hidden md:inline">
                      {activity.deviceName}
                    </span>
                  )}
                  <span className="text-sm font-medium">{activity.time}</span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      getActivityColor(activity.type)
                    )}
                  >
                    {getActivityLabel(activity.type)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
