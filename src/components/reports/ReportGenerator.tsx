
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function ReportGenerator() {
  const [reportType, setReportType] = useState("daily");
  const [format, setFormat] = useState("excel");
  const [selectedColumns, setSelectedColumns] = useState([
    "employee_id", 
    "employee_name",
    "department",
    "date",
    "check_in",
    "check_out",
    "hours_worked"
  ]);
  
  const columns = [
    { id: "employee_id", label: "Employee ID" },
    { id: "employee_name", label: "Employee Name" },
    { id: "department", label: "Department" },
    { id: "date", label: "Date" },
    { id: "check_in", label: "Check In" },
    { id: "lunch_out", label: "Lunch Out" },
    { id: "lunch_in", label: "Lunch In" },
    { id: "check_out", label: "Check Out" },
    { id: "hours_worked", label: "Hours Worked" },
    { id: "overtime", label: "Overtime" },
    { id: "status", label: "Status" },
    { id: "device_id", label: "Device ID" },
    { id: "device_location", label: "Device Location" },
  ];

  const handleToggleColumn = (columnId: string) => {
    if (selectedColumns.includes(columnId)) {
      setSelectedColumns(selectedColumns.filter(id => id !== columnId));
    } else {
      setSelectedColumns([...selectedColumns, columnId]);
    }
  };

  const handleSelectAllColumns = () => {
    if (selectedColumns.length === columns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(columns.map(column => column.id));
    }
  };

  const handleGenerateReport = () => {
    toast("Generating report", {
      description: "Your report is being generated. This may take a moment."
    });
    
    setTimeout(() => {
      toast.success("Report ready", {
        description: "Your report has been generated and is ready to download."
      });
    }, 2000);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <RadioGroup value={reportType} onValueChange={setReportType} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="cursor-pointer">Daily Report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="cursor-pointer">Weekly Report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">Monthly Report</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="cursor-pointer">Custom Date Range</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue="all">
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Select Columns</Label>
              <Button variant="ghost" size="sm" onClick={handleSelectAllColumns}>
                {selectedColumns.length === columns.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            
            <ScrollArea className="h-[260px] border rounded-md p-2">
              <div className="space-y-2">
                {columns.map((column) => (
                  <div key={column.id} className="flex items-center space-x-2 py-1 px-2 hover:bg-muted/60 rounded">
                    <Checkbox 
                      id={`column-${column.id}`} 
                      checked={selectedColumns.includes(column.id)}
                      onCheckedChange={() => handleToggleColumn(column.id)}
                    />
                    <Label 
                      htmlFor={`column-${column.id}`}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {column.label}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-2">
              <Button 
                onClick={handleGenerateReport}
                className="w-full"
                disabled={selectedColumns.length === 0}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">Recent Reports</h3>
          <div className="border rounded-md divide-y">
            <div className="p-3 flex items-center justify-between hover:bg-muted/20">
              <div>
                <h4 className="font-medium">Daily Attendance Report</h4>
                <p className="text-xs text-muted-foreground">Generated on May 15, 2023 • Excel</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 flex items-center justify-between hover:bg-muted/20">
              <div>
                <h4 className="font-medium">Monthly Summary - April 2023</h4>
                <p className="text-xs text-muted-foreground">Generated on May 1, 2023 • PDF</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 flex items-center justify-between hover:bg-muted/20">
              <div>
                <h4 className="font-medium">Overtime Report</h4>
                <p className="text-xs text-muted-foreground">Generated on April 30, 2023 • Excel</p>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
