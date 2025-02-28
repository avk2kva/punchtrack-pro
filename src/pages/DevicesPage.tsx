
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { DeviceList } from "@/components/devices/DeviceList";

const DevicesPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Device Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor your ZKTeco attendance devices
        </p>
      </div>

      <DeviceList />
    </MainLayout>
  );
};

export default DevicesPage;
