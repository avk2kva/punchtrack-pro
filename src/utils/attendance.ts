
/**
 * Attendance Data Processing Utilities
 */

import { ZKAttendanceRecord } from "./zkteco";

export interface ShiftConfig {
  id: string;
  name: string;
  type: "weekday" | "weekend" | "custom";
  times: {
    checkIn: string;
    lunchOut?: string;
    lunchIn?: string;
    checkOut: string;
  };
  graceMinutes?: number;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  shiftId: string;
}

export interface ProcessedAttendance {
  employeeId: string;
  employeeName?: string;
  date: string;
  checkIn?: Date;
  lunchOut?: Date;
  lunchIn?: Date;
  checkOut?: Date;
  hoursWorked?: number;
  missedPunches: ("check-in" | "lunch-out" | "lunch-in" | "check-out")[];
  isComplete: boolean;
}

/**
 * Processes raw attendance records into structured daily records
 * Identifies missed punches based on shift configuration
 */
export const processAttendanceRecords = (
  records: ZKAttendanceRecord[],
  employees: Employee[],
  shifts: ShiftConfig[]
): ProcessedAttendance[] => {
  // Group records by employee and date
  const groupedRecords: Record<string, Record<string, ZKAttendanceRecord[]>> = {};
  
  // Group by employee and date
  records.forEach(record => {
    const employeeId = record.userId;
    const date = record.timestamp.toISOString().split('T')[0];
    
    if (!groupedRecords[employeeId]) {
      groupedRecords[employeeId] = {};
    }
    
    if (!groupedRecords[employeeId][date]) {
      groupedRecords[employeeId][date] = [];
    }
    
    groupedRecords[employeeId][date].push(record);
  });
  
  // Process each employee's daily records
  const processedRecords: ProcessedAttendance[] = [];
  
  for (const employeeId in groupedRecords) {
    for (const date in groupedRecords[employeeId]) {
      const dailyRecords = groupedRecords[employeeId][date];
      
      // Sort by timestamp
      dailyRecords.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      // Find employee and shift configuration
      const employee = employees.find(emp => emp.id === employeeId);
      
      if (!employee) {
        console.warn(`Employee with ID ${employeeId} not found`);
        continue;
      }
      
      const shift = shifts.find(s => s.id === employee.shiftId);
      
      if (!shift) {
        console.warn(`Shift not found for employee ${employeeId}`);
        continue;
      }
      
      // Initialize attendance record
      const attendance: ProcessedAttendance = {
        employeeId,
        employeeName: employee.name,
        date,
        missedPunches: [],
        isComplete: false
      };
      
      // Determine expected punches based on shift type
      const expectedPunches = shift.type === "weekday" ? 4 : 2;
      
      // Check for missed punches
      if (dailyRecords.length < expectedPunches) {
        // Some punches are missing
        if (shift.type === "weekday") {
          // Check which specific punches are missing for weekday shift
          const checkIn = dailyRecords.find(r => r.punchType === 0);
          const lunchOut = dailyRecords.find(r => r.punchType === 2);
          const lunchIn = dailyRecords.find(r => r.punchType === 3);
          const checkOut = dailyRecords.find(r => r.punchType === 1);
          
          if (!checkIn) attendance.missedPunches.push("check-in");
          if (!lunchOut) attendance.missedPunches.push("lunch-out");
          if (!lunchIn) attendance.missedPunches.push("lunch-in");
          if (!checkOut) attendance.missedPunches.push("check-out");
          
          // Set available punches
          if (checkIn) attendance.checkIn = checkIn.timestamp;
          if (lunchOut) attendance.lunchOut = lunchOut.timestamp;
          if (lunchIn) attendance.lunchIn = lunchIn.timestamp;
          if (checkOut) attendance.checkOut = checkOut.timestamp;
        } else {
          // For weekend shift, only check-in and check-out are required
          const checkIn = dailyRecords.find(r => r.punchType === 0);
          const checkOut = dailyRecords.find(r => r.punchType === 1);
          
          if (!checkIn) attendance.missedPunches.push("check-in");
          if (!checkOut) attendance.missedPunches.push("check-out");
          
          // Set available punches
          if (checkIn) attendance.checkIn = checkIn.timestamp;
          if (checkOut) attendance.checkOut = checkOut.timestamp;
        }
      } else {
        // All punches are present, assign them properly
        if (shift.type === "weekday") {
          // For weekday shift with 4 punches
          attendance.checkIn = dailyRecords.find(r => r.punchType === 0)?.timestamp;
          attendance.lunchOut = dailyRecords.find(r => r.punchType === 2)?.timestamp;
          attendance.lunchIn = dailyRecords.find(r => r.punchType === 3)?.timestamp;
          attendance.checkOut = dailyRecords.find(r => r.punchType === 1)?.timestamp;
        } else {
          // For weekend shift with 2 punches
          attendance.checkIn = dailyRecords.find(r => r.punchType === 0)?.timestamp;
          attendance.checkOut = dailyRecords.find(r => r.punchType === 1)?.timestamp;
        }
      }
      
      // Calculate hours worked if both check-in and check-out are available
      if (attendance.checkIn && attendance.checkOut) {
        let workMins = (attendance.checkOut.getTime() - attendance.checkIn.getTime()) / (1000 * 60);
        
        // Subtract lunch break if applicable and available
        if (shift.type === "weekday" && attendance.lunchOut && attendance.lunchIn) {
          const lunchBreakMins = (attendance.lunchIn.getTime() - attendance.lunchOut.getTime()) / (1000 * 60);
          workMins -= lunchBreakMins;
        }
        
        // Convert to hours with 2 decimal places
        attendance.hoursWorked = Math.round((workMins / 60) * 100) / 100;
      }
      
      // Check if attendance record is complete
      attendance.isComplete = attendance.missedPunches.length === 0;
      
      processedRecords.push(attendance);
    }
  }
  
  return processedRecords;
};

/**
 * Identifies missed punches from attendance records
 */
export const getMissedPunches = (
  attendanceRecords: ProcessedAttendance[]
): ProcessedAttendance[] => {
  return attendanceRecords.filter(record => record.missedPunches.length > 0);
};

/**
 * Generates daily attendance report
 */
export const generateDailyReport = (
  date: string,
  attendanceRecords: ProcessedAttendance[],
  employees: Employee[]
): ProcessedAttendance[] => {
  // Filter records for the specified date
  return attendanceRecords.filter(record => record.date === date);
};

/**
 * Generates weekly attendance report
 */
export const generateWeeklyReport = (
  startDate: string,
  endDate: string,
  attendanceRecords: ProcessedAttendance[]
): ProcessedAttendance[] => {
  // Filter records for the date range
  return attendanceRecords.filter(record => {
    return record.date >= startDate && record.date <= endDate;
  });
};

/**
 * Formats time for display (HH:MM AM/PM)
 */
export const formatTime = (date?: Date): string => {
  if (!date) return "--:--";
  
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

/**
 * Determines if a punch is late based on shift configuration
 */
export const isPunchLate = (
  punchTime: Date,
  expectedTime: string,
  graceMinutes: number = 15
): boolean => {
  // Convert expected time string (HH:MM) to Date object for today
  const [hours, minutes] = expectedTime.split(":").map(Number);
  const expectedDate = new Date(punchTime.getTime());
  expectedDate.setHours(hours, minutes, 0, 0);
  
  // For check-in, late means after expected time
  // Allow grace period (e.g., 15 minutes)
  const gracePeriod = graceMinutes * 60 * 1000; // Convert to milliseconds
  
  return punchTime.getTime() > (expectedDate.getTime() + gracePeriod);
};

/**
 * Determines if a punch is early based on shift configuration
 */
export const isPunchEarly = (
  punchTime: Date,
  expectedTime: string,
  graceMinutes: number = 15
): boolean => {
  // Convert expected time string (HH:MM) to Date object for today
  const [hours, minutes] = expectedTime.split(":").map(Number);
  const expectedDate = new Date(punchTime.getTime());
  expectedDate.setHours(hours, minutes, 0, 0);
  
  // For check-out, early means before expected time
  // Allow grace period (e.g., 15 minutes)
  const gracePeriod = graceMinutes * 60 * 1000; // Convert to milliseconds
  
  return punchTime.getTime() < (expectedDate.getTime() - gracePeriod);
};

export default {
  processAttendanceRecords,
  getMissedPunches,
  generateDailyReport,
  generateWeeklyReport,
  formatTime,
  isPunchLate,
  isPunchEarly
};
