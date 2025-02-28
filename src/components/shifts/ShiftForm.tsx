
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface TimeConfigProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  marginAllowed?: string;
}

const TimeConfig = ({ 
  label, 
  description, 
  value, 
  onChange, 
  marginAllowed = "15 min" 
}: TimeConfigProps) => (
  <div className="space-y-2">
    <div className="flex items-start justify-between">
      <div>
        <Label htmlFor={label.toLowerCase().replace(' ', '-')}>{label}</Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-1 text-right">
        <Input
          id={label.toLowerCase().replace(' ', '-')}
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-32 text-right"
        />
        <p className="text-xs text-muted-foreground">Grace: {marginAllowed}</p>
      </div>
    </div>
  </div>
);

export function ShiftForm() {
  const [shiftName, setShiftName] = React.useState("Regular Shift");
  const [shiftType, setShiftType] = React.useState("weekday");
  const [checkIn, setCheckIn] = React.useState("08:00");
  const [lunchOut, setLunchOut] = React.useState("12:30");
  const [lunchIn, setLunchIn] = React.useState("13:30");
  const [checkOut, setCheckOut] = React.useState("17:00");
  const [isFlexible, setIsFlexible] = React.useState(false);
  
  const handleSaveShift = () => {
    toast.success("Shift configuration saved", {
      description: `${shiftName} has been updated successfully.`,
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Shift Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shift-name">Shift Name</Label>
              <Input
                id="shift-name"
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shift-type">Shift Type</Label>
              <Select value={shiftType} onValueChange={setShiftType}>
                <SelectTrigger id="shift-type">
                  <SelectValue placeholder="Select shift type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekday">Weekday (4 punches)</SelectItem>
                  <SelectItem value="weekend">Weekend (2 punches)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="flexible-shift">Flexible Timing</Label>
                <p className="text-xs text-muted-foreground">Allow flexible check-in/out times</p>
              </div>
              <Switch 
                id="flexible-shift" 
                checked={isFlexible}
                onCheckedChange={setIsFlexible}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <TimeConfig 
              label="Check In"
              description="Morning arrival time"
              value={checkIn}
              onChange={setCheckIn}
            />
            
            {shiftType === "weekday" && (
              <>
                <TimeConfig 
                  label="Lunch Out"
                  value={lunchOut}
                  onChange={setLunchOut}
                />
                
                <TimeConfig 
                  label="Lunch In"
                  value={lunchIn}
                  onChange={setLunchIn}
                />
              </>
            )}
            
            <TimeConfig 
              label="Check Out"
              description="End of workday"
              value={checkOut}
              onChange={setCheckOut}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSaveShift}>Save Configuration</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
