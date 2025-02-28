
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { ReportGenerator } from "@/components/reports/ReportGenerator";

const ReportsPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Generate and export customized attendance reports
        </p>
      </div>
      
      <ReportGenerator />
    </MainLayout>
  );
};

export default ReportsPage;
