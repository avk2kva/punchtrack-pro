
import React from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all p-4 md:p-6 animate-fade-in",
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
