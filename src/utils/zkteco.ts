
/**
 * ZKTeco SDK Integration Module
 * 
 * This module provides functions to interact with ZKTeco attendance devices.
 * In a real-world implementation, this would connect to the actual ZKTeco SDK,
 * but for this demo, we're simulating the behavior.
 */

// Types
export interface ZKDevice {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  model: string;
  serialNumber: string;
  status: "online" | "offline" | "error";
}

export interface ZKAttendanceRecord {
  userId: string;
  timestamp: Date;
  punchType: number; // 0: Check-In, 1: Check-Out, 2: Lunch-Out, 3: Lunch-In
  deviceId: string;
}

// Mock connection status
let isConnected = false;

/**
 * Initializes the ZKTeco SDK
 */
export const initializeSDK = async (): Promise<boolean> => {
  console.log("Initializing ZKTeco SDK...");
  // Simulate initialization
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("ZKTeco SDK initialized successfully");
      resolve(true);
    }, 1000);
  });
};

/**
 * Connects to a ZKTeco device
 */
export const connectToDevice = async (ipAddress: string, port: number = 4370): Promise<boolean> => {
  console.log(`Connecting to device at ${ipAddress}:${port}...`);
  // Simulate connection
  return new Promise((resolve) => {
    setTimeout(() => {
      isConnected = true;
      console.log(`Connected to device at ${ipAddress}:${port}`);
      resolve(true);
    }, 1500);
  });
};

/**
 * Disconnects from a ZKTeco device
 */
export const disconnectFromDevice = async (): Promise<boolean> => {
  if (!isConnected) {
    console.log("Not connected to any device");
    return false;
  }
  
  console.log("Disconnecting from device...");
  // Simulate disconnection
  return new Promise((resolve) => {
    setTimeout(() => {
      isConnected = false;
      console.log("Disconnected from device");
      resolve(true);
    }, 500);
  });
};

/**
 * Scans the network for ZKTeco devices
 */
export const scanForDevices = async (
  subnet: string = "192.168.1",
  timeout: number = 5000
): Promise<ZKDevice[]> => {
  console.log(`Scanning subnet ${subnet}.* for ZKTeco devices...`);
  // Simulate device discovery
  return new Promise((resolve) => {
    setTimeout(() => {
      const devices: ZKDevice[] = [
        {
          id: "1",
          name: "Main Entrance",
          ipAddress: `${subnet}.101`,
          port: 4370,
          model: "ZKTeco K40",
          serialNumber: "ZK12345678",
          status: "online"
        },
        {
          id: "2",
          name: "Side Entrance",
          ipAddress: `${subnet}.102`,
          port: 4370,
          model: "ZKTeco F18",
          serialNumber: "ZK87654321",
          status: "online"
        },
        {
          id: "3",
          name: "Cafeteria",
          ipAddress: `${subnet}.103`,
          port: 4370,
          model: "ZKTeco F22",
          serialNumber: "ZK11223344",
          status: "offline"
        },
      ];
      console.log(`Found ${devices.length} devices`);
      resolve(devices);
    }, timeout);
  });
};

/**
 * Downloads attendance records from a device
 */
export const downloadAttendanceData = async (
  ipAddress: string,
  fromDate?: Date,
  toDate?: Date
): Promise<ZKAttendanceRecord[]> => {
  console.log(`Downloading attendance data from ${ipAddress}...`);
  
  // Connect to device first
  await connectToDevice(ipAddress);
  
  // Simulate data download
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock attendance records
      const now = new Date();
      const records: ZKAttendanceRecord[] = [];
      
      // Generate 50 random records
      for (let i = 0; i < 50; i++) {
        const date = new Date(now);
        date.setHours(Math.floor(Math.random() * 14) + 8); // Between 8 AM and 10 PM
        date.setMinutes(Math.floor(Math.random() * 60));
        date.setDate(date.getDate() - Math.floor(Math.random() * 7)); // Within the last week
        
        records.push({
          userId: `EMP${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`,
          timestamp: date,
          punchType: Math.floor(Math.random() * 4), // 0-3
          deviceId: `${Math.floor(Math.random() * 3) + 1}` // 1-3
        });
      }
      
      // Sort by date
      records.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      console.log(`Downloaded ${records.length} attendance records`);
      disconnectFromDevice(); // Disconnect after download
      resolve(records);
    }, 2000);
  });
};

/**
 * Sets the device time
 */
export const setDeviceTime = async (
  ipAddress: string,
  dateTime?: Date
): Promise<boolean> => {
  const time = dateTime || new Date();
  console.log(`Setting device time to ${time.toISOString()}...`);
  
  await connectToDevice(ipAddress);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Device time set successfully");
      disconnectFromDevice();
      resolve(true);
    }, 1000);
  });
};

/**
 * Restarts a device
 */
export const restartDevice = async (ipAddress: string): Promise<boolean> => {
  console.log(`Restarting device at ${ipAddress}...`);
  
  await connectToDevice(ipAddress);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Device restarted successfully");
      disconnectFromDevice();
      resolve(true);
    }, 3000);
  });
};

/**
 * Maps a punch type number to a string label
 */
export const getPunchTypeLabel = (punchType: number): string => {
  switch (punchType) {
    case 0:
      return "Check-In";
    case 1:
      return "Check-Out";
    case 2:
      return "Lunch-Out";
    case 3:
      return "Lunch-In";
    default:
      return "Unknown";
  }
};

// Export default for easier importing
export default {
  initializeSDK,
  connectToDevice,
  disconnectFromDevice,
  scanForDevices,
  downloadAttendanceData,
  setDeviceTime,
  restartDevice,
  getPunchTypeLabel
};
