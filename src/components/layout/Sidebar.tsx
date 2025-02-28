
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Layers,
  Clock,
  FileText,
  BarChart,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
      active
        ? "bg-accent text-primary"
        : "text-muted-foreground hover:bg-accent/50 hover:text-primary"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      to: "/devices",
      icon: <Layers className="h-5 w-5" />,
      label: "Devices",
    },
    {
      to: "/shifts",
      icon: <Clock className="h-5 w-5" />,
      label: "Shifts",
    },
    {
      to: "/reports/missed-punches",
      icon: <FileText className="h-5 w-5" />,
      label: "Missed Punches",
    },
    {
      to: "/reports",
      icon: <BarChart className="h-5 w-5" />,
      label: "Reports",
    },
    {
      to: "/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 md:z-0 h-screen w-[280px] border-r bg-card transition-transform duration-300 ease-in-out transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b">
            <h1 className="text-xl font-semibold">Attendance Pro</h1>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto md:hidden p-2 rounded-full hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="glass rounded-lg p-4 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Attendance Pro</p>
              <p>v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
