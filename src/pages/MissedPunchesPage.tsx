
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { MissedPunchesReport } from "@/components/reports/MissedPunchesReport";

const MissedPunchesPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Missed Punches</h1>
        <p className="text-muted-foreground">
          Track and manage missed attendance punches
        </p>
      </div>
      
      <MissedPunchesReport />
    </MainLayout>
  );
};

export default MissedPunchesPage;
