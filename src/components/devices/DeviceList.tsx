
import React, { useState } from "react";
import { DeviceCard, DeviceData } from "./DeviceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, Filter } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Mock device data
const mockDevices: DeviceData[] = [
  {
    id: "1",
    name: "Main Entrance",
    ipAddress: "192.168.1.101",
    model: "ZKTeco K40",
    status: "online",
    lastSync: "Today, 9:30 AM",
    location: "Main Building"
  },
  {
    id: "2",
    name: "Side Entrance",
    ipAddress: "192.168.1.102",
    model: "ZKTeco F18",
    status: "online",
    lastSync: "Today, 9:45 AM",
    location: "Annex Building"
  },
  {
    id: "3",
    name: "Cafeteria",
    ipAddress: "192.168.1.103",
    model: "ZKTeco F22",
    status: "offline",
    lastSync: "Yesterday, 6:00 PM",
    location: "Cafeteria"
  },
  {
    id: "4",
    name: "Warehouse",
    ipAddress: "192.168.1.104",
    model: "ZKTeco K20",
    status: "error",
    lastSync: "3 days ago",
    location: "Warehouse"
  },
];

export function DeviceList() {
  const [devices, setDevices] = useState<DeviceData[]>(mockDevices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshDevices = () => {
    setIsRefreshing(true);
    
    // Simulating an API call
    setTimeout(() => {
      toast("Devices refreshed", {
        description: "All device statuses have been updated."
      });
      setIsRefreshing(false);
    }, 1500);
  };

  const handleSyncData = (deviceId: string) => {
    toast("Synchronizing data", {
      description: `Downloading attendance data from device ${deviceId}...`,
    });
    
    // Simulating sync process
    setTimeout(() => {
      toast.success("Data synchronized", {
        description: "All attendance records have been downloaded successfully."
      });
    }, 2000);
  };

  const handleConfigure = (deviceId: string) => {
    toast("Opening configuration", {
      description: `Loading device ${deviceId} settings...`,
    });
  };

  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.ipAddress.includes(searchQuery) ||
    device.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Input
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleRefreshDevices}
            disabled={isRefreshing}
            className="flex-1 sm:flex-none"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onSyncData={handleSyncData}
              onConfigure={handleConfigure}
              className="animate-scale-in"
              style={{ animationDelay: `${parseInt(device.id) * 100}ms` }}
            />
          ))
        ) : (
          <div className="col-span-3 py-12 text-center">
            <p className="text-muted-foreground">No devices found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
