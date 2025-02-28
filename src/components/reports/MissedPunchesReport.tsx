
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Filter, Mail } from "lucide-react";

interface MissedPunch {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  punchType: "Check-In" | "Lunch-Out" | "Lunch-In" | "Check-Out";
  status: "pending" | "acknowledged" | "resolved";
}

const mockMissedPunches: MissedPunch[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "John Doe",
    department: "Engineering",
    date: "2023-05-15",
    punchType: "Lunch-In",
    status: "pending"
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Jane Smith",
    department: "Marketing",
    date: "2023-05-15",
    punchType: "Check-Out",
    status: "acknowledged"
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    department: "Finance",
    date: "2023-05-14",
    punchType: "Check-In",
    status: "resolved"
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Sarah Johnson",
    department: "HR",
    date: "2023-05-15",
    punchType: "Lunch-Out",
    status: "pending"
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "David Lee",
    department: "Operations",
    date: "2023-05-13",
    punchType: "Check-Out",
    status: "pending"
  }
];

const statusColors = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  acknowledged: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200"
};

export function MissedPunchesReport() {
  const [punches, setPunches] = useState<MissedPunch[]>(mockMissedPunches);
  const [selectedPunches, setSelectedPunches] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const handleSelectAll = () => {
    if (selectedPunches.length === filteredPunches.length) {
      setSelectedPunches([]);
    } else {
      setSelectedPunches(filteredPunches.map(punch => punch.id));
    }
  };
  
  const handleSelectPunch = (punchId: string) => {
    if (selectedPunches.includes(punchId)) {
      setSelectedPunches(selectedPunches.filter(id => id !== punchId));
    } else {
      setSelectedPunches([...selectedPunches, punchId]);
    }
  };
  
  const filteredPunches = filterStatus === "all" 
    ? punches 
    : punches.filter(punch => punch.status === filterStatus);
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Missed Punches Report</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={selectedPunches.length === 0}>
            <Mail className="h-4 w-4 mr-2" />
            Notify
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" defaultValue="2023-05-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" defaultValue="2023-05-16" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="shrink-0">
            <Button className="w-full h-full mt-7">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md">
          <div className="border-b px-4 py-3 bg-muted/40 flex items-center">
            <Checkbox 
              id="select-all" 
              checked={selectedPunches.length === filteredPunches.length && filteredPunches.length > 0}
              onCheckedChange={handleSelectAll}
              className="mr-4"
            />
            <div className="grid grid-cols-7 w-full text-sm font-medium">
              <div className="col-span-2">Employee</div>
              <div>Department</div>
              <div>Date</div>
              <div>Punch Type</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
          </div>
          
          <ScrollArea className="h-[400px]">
            {filteredPunches.length > 0 ? (
              filteredPunches.map((punch) => (
                <div key={punch.id} className="px-4 py-3 border-b last:border-0 hover:bg-muted/20 flex items-center">
                  <Checkbox 
                    id={`select-${punch.id}`}
                    checked={selectedPunches.includes(punch.id)}
                    onCheckedChange={() => handleSelectPunch(punch.id)}
                    className="mr-4"
                  />
                  <div className="grid grid-cols-7 w-full items-center text-sm">
                    <div className="col-span-2">
                      <p className="font-medium">{punch.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{punch.employeeId}</p>
                    </div>
                    <div>{punch.department}</div>
                    <div>{punch.date}</div>
                    <div>{punch.punchType}</div>
                    <div>
                      <Badge variant="outline" className={statusColors[punch.status]}>
                        {punch.status.charAt(0).toUpperCase() + punch.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No missed punches matching the selected filters.
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
