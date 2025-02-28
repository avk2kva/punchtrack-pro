
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Download, BarChart } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import zktecoSDK from "@/utils/zkteco";

const Dashboard = () => {
  useEffect(() => {
    // Initialize ZKTeco SDK on component mount
    const initSDK = async () => {
      try {
        await zktecoSDK.initializeSDK();
        toast.success("Connected to attendance system", {
          description: "ZKTeco SDK initialized successfully"
        });
      } catch (error) {
        console.error("Failed to initialize ZKTeco SDK:", error);
        toast.error("Connection error", {
          description: "Failed to initialize ZKTeco SDK"
        });
      }
    };
    
    initSDK();
  }, []);
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your attendance management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Data
          </Button>
          <Button>
            <BarChart className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>
      
      <OverviewStats />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity />
        
        <Card className="lg:col-span-1 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Morning Check-In</h3>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-medium">
                  8:00
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-green-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "98%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span className="text-muted-foreground">98% on time</span>
                    <span className="font-medium">122/124 employees</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Lunch Break</h3>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-medium">
                  12:30
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-amber-100 rounded-full">
                    <div className="h-2 bg-amber-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span className="text-muted-foreground">85% tracked</span>
                    <span className="font-medium">105/124 employees</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium">Afternoon Check-Out</h3>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium">
                  17:00
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-blue-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "43%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span className="text-muted-foreground">In progress</span>
                    <span className="font-medium">53/124 employees</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-primary">
                View detailed schedule
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
