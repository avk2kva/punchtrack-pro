
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Download, RefreshCw, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DeviceData {
  id: string;
  name: string;
  ipAddress: string;
  model: string;
  status: "online" | "offline" | "error";
  lastSync: string;
  location: string;
}

interface DeviceCardProps {
  device: DeviceData;
  onSyncData: (id: string) => void;
  onConfigure: (id: string) => void;
  className?: string;
  style?: React.CSSProperties; // Added style prop to the interface
}

export function DeviceCard({ device, onSyncData, onConfigure, className, style }: DeviceCardProps) {
  const statusColor = {
    online: "bg-green-100 text-green-800 border-green-200",
    offline: "bg-gray-100 text-gray-800 border-gray-200",
    error: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)} style={style}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{device.name}</CardTitle>
          <Badge
            variant="outline"
            className={cn("ml-auto", statusColor[device.status])}
          >
            {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{device.ipAddress}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Model</span>
            <span className="font-medium">{device.model}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Location</span>
            <span className="font-medium">{device.location}</span>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-muted-foreground">Last Synchronized</span>
            <span className="font-medium">{device.lastSync}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t bg-muted/20 p-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => onSyncData(device.id)}
          disabled={device.status !== "online"}
        >
          <Download className="h-3.5 w-3.5 mr-1" />
          Sync Data
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => onConfigure(device.id)}
        >
          <Settings className="h-3.5 w-3.5 mr-1" />
          Configure
        </Button>
      </CardFooter>
    </Card>
  );
}
