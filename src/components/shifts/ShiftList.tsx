
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface ShiftData {
  id: string;
  name: string;
  type: "weekday" | "weekend" | "custom";
  times: {
    checkIn: string;
    lunchOut?: string;
    lunchIn?: string;
    checkOut: string;
  };
  isActive: boolean;
  employees: number;
}

const mockShifts: ShiftData[] = [
  {
    id: "1",
    name: "Regular Shift",
    type: "weekday",
    times: {
      checkIn: "08:00",
      lunchOut: "12:30",
      lunchIn: "13:30",
      checkOut: "17:00"
    },
    isActive: true,
    employees: 86
  },
  {
    id: "2",
    name: "Night Shift",
    type: "weekday",
    times: {
      checkIn: "20:00",
      lunchOut: "01:00",
      lunchIn: "02:00",
      checkOut: "05:00"
    },
    isActive: true,
    employees: 24
  },
  {
    id: "3",
    name: "Weekend Shift",
    type: "weekend",
    times: {
      checkIn: "09:00",
      checkOut: "14:00"
    },
    isActive: true,
    employees: 38
  },
  {
    id: "4",
    name: "Flexible Hours",
    type: "custom",
    times: {
      checkIn: "10:00",
      lunchOut: "13:00",
      lunchIn: "14:00",
      checkOut: "19:00"
    },
    isActive: false,
    employees: 12
  }
];

export function ShiftList() {
  const [shifts, setShifts] = React.useState<ShiftData[]>(mockShifts);

  const handleEdit = (shiftId: string) => {
    toast("Edit shift", {
      description: `Loading shift configuration for ${shifts.find(s => s.id === shiftId)?.name}`
    });
  };

  const handleDeleteShift = (shiftId: string) => {
    toast.error("Delete shift", {
      description: "Are you sure you want to delete this shift?",
      action: {
        label: "Confirm",
        onClick: () => {
          setShifts(shifts.filter(shift => shift.id !== shiftId));
          toast.success("Shift deleted", {
            description: "The shift has been removed successfully."
          });
        }
      },
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Shift Configurations</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Shift
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px]">
          <div className="space-y-3">
            {shifts.map((shift) => (
              <div 
                key={shift.id}
                className="p-4 border rounded-lg bg-background hover:bg-muted/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg flex items-center">
                      {shift.name}
                      {shift.isActive ? (
                        <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="ml-2">Inactive</Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {shift.type === "weekday" ? "4-punch system" : shift.type === "weekend" ? "2-punch system" : "Custom system"}
                      <span className="mx-2">•</span>
                      <span>{shift.employees} employee{shift.employees !== 1 ? 's' : ''}</span>
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(shift.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteShift(shift.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground">Check In</span>
                      <p className="font-medium">{shift.times.checkIn}</p>
                    </div>
                  </div>
                  
                  {shift.type === "weekday" && (
                    <>
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <div>
                          <span className="text-xs text-muted-foreground">Lunch Out</span>
                          <p className="font-medium">{shift.times.lunchOut}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <div>
                          <span className="text-xs text-muted-foreground">Lunch In</span>
                          <p className="font-medium">{shift.times.lunchIn}</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground">Check Out</span>
                      <p className="font-medium">{shift.times.checkOut}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
