
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { ShiftForm } from "@/components/shifts/ShiftForm";
import { ShiftList } from "@/components/shifts/ShiftList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShiftsPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shift Management</h1>
        <p className="text-muted-foreground">
          Configure flexible shift schedules and attendance rules
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px] mb-6">
          <TabsTrigger value="list">Shift List</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-0">
          <ShiftList />
        </TabsContent>
        <TabsContent value="configuration" className="mt-0">
          <ShiftForm />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ShiftsPage;
