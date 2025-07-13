// Mock IoT Sensor Data for Digital Twin Data Center
export interface SensorReading {
  id: string;
  name: string;
  type: 'temperature' | 'humidity' | 'power' | 'network' | 'security' | 'air_quality' | 'vibration';
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  location: string;
  timestamp: Date;
  threshold: {
    min: number;
    max: number;
    warning: number;
    critical: number;
  };
}

export interface EquipmentStatus {
  id: string;
  name: string;
  type: 'server' | 'ups' | 'cooling' | 'network' | 'security';
  status: 'operational' | 'maintenance' | 'warning' | 'critical';
  health: number; // 0-100%
  uptime: number; // hours
  lastMaintenance: Date;
  nextMaintenance: Date;
  location: string;
  specs: Record<string, any>;
}

export interface SecurityEvent {
  id: string;
  type: 'access_attempt' | 'intrusion_detected' | 'unauthorized_access' | 'system_breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  location: string;
  description: string;
  status: 'detected' | 'investigating' | 'resolved';
}

export interface PredictiveAlert {
  id: string;
  equipmentId: string;
  type: 'maintenance_due' | 'failure_predicted' | 'performance_degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-100%
  estimatedTime: number; // hours until issue
  description: string;
  recommendation: string;
  timestamp: Date;
}

// Generate realistic sensor data
class SensorDataGenerator {
  private static generateTemperature(baseTemp: number = 22): SensorReading {
    const variation = (Math.random() - 0.5) * 4;
    const value = Math.round((baseTemp + variation) * 10) / 10;
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (value > 28) status = 'critical';
    else if (value > 25) status = 'warning';
    
    return {
      id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'Temperature Sensor',
      type: 'temperature',
      value,
      unit: '°C',
      status,
      location: `Rack ${Math.floor(Math.random() * 20) + 1}`,
      timestamp: new Date(),
      threshold: { min: 18, max: 30, warning: 25, critical: 28 }
    };
  }

  private static generateHumidity(): SensorReading {
    const value = Math.round((45 + Math.random() * 15) * 10) / 10;
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (value > 65 || value < 30) status = 'critical';
    else if (value > 60 || value < 35) status = 'warning';
    
    return {
      id: `humid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'Humidity Sensor',
      type: 'humidity',
      value,
      unit: '%',
      status,
      location: `Zone ${Math.floor(Math.random() * 8) + 1}`,
      timestamp: new Date(),
      threshold: { min: 30, max: 70, warning: 60, critical: 65 }
    };
  }

  private static generatePower(): SensorReading {
    const value = Math.round((85 + Math.random() * 12) * 10) / 10;
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (value > 95) status = 'critical';
    else if (value > 90) status = 'warning';
    
    return {
      id: `power_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'Power Consumption',
      type: 'power',
      value,
      unit: 'kW',
      status,
      location: `UPS ${Math.floor(Math.random() * 4) + 1}`,
      timestamp: new Date(),
      threshold: { min: 0, max: 100, warning: 90, critical: 95 }
    };
  }

  private static generateNetwork(): SensorReading {
    const value = Math.round((92 + Math.random() * 7) * 10) / 10;
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (value < 85) status = 'critical';
    else if (value < 90) status = 'warning';
    
    return {
      id: `net_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'Network Performance',
      type: 'network',
      value,
      unit: '%',
      status,
      location: `Switch ${Math.floor(Math.random() * 6) + 1}`,
      timestamp: new Date(),
      threshold: { min: 80, max: 100, warning: 90, critical: 85 }
    };
  }

  private static generateAirQuality(): SensorReading {
    const value = Math.round((15 + Math.random() * 20) * 10) / 10;
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (value > 50) status = 'critical';
    else if (value > 35) status = 'warning';
    
    return {
      id: `air_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'Air Quality Index',
      type: 'air_quality',
      value,
      unit: 'AQI',
      status,
      location: `Intake ${Math.floor(Math.random() * 4) + 1}`,
      timestamp: new Date(),
      threshold: { min: 0, max: 100, warning: 35, critical: 50 }
    };
  }

  private static generateVibration(): SensorReading {
    const value = Math.round((0.2 + Math.random() * 0.8) * 100) / 100;
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    
    if (value > 0.8) status = 'critical';
    else if (value > 0.5) status = 'warning';
    
    return {
      id: `vib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'Vibration Level',
      type: 'vibration',
      value,
      unit: 'mm/s',
      status,
      location: `Floor ${Math.floor(Math.random() * 3) + 1}`,
      timestamp: new Date(),
      threshold: { min: 0, max: 2, warning: 0.5, critical: 0.8 }
    };
  }

  public static generateSensorReadings(count: number = 50): SensorReading[] {
    const readings: SensorReading[] = [];
    const types = ['temperature', 'humidity', 'power', 'network', 'air_quality', 'vibration'];
    
    for (let i = 0; i < count; i++) {
      const type = types[i % types.length];
      
      switch (type) {
        case 'temperature':
          readings.push(this.generateTemperature());
          break;
        case 'humidity':
          readings.push(this.generateHumidity());
          break;
        case 'power':
          readings.push(this.generatePower());
          break;
        case 'network':
          readings.push(this.generateNetwork());
          break;
        case 'air_quality':
          readings.push(this.generateAirQuality());
          break;
        case 'vibration':
          readings.push(this.generateVibration());
          break;
      }
    }
    
    return readings;
  }

  public static generateEquipmentStatus(): EquipmentStatus[] {
    const equipment: EquipmentStatus[] = [
      {
        id: 'server_01',
        name: 'Primary Database Server',
        type: 'server',
        status: 'operational',
        health: 94,
        uptime: 2160, // 90 days
        lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        nextMaintenance: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        location: 'Rack A-01',
        specs: { cpu: 'Intel Xeon E5-2697', ram: '128GB', storage: '4TB SSD RAID' }
      },
      {
        id: 'ups_01',
        name: 'Main UPS System',
        type: 'ups',
        status: 'warning',
        health: 78,
        uptime: 8760, // 1 year
        lastMaintenance: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        nextMaintenance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: 'Power Room',
        specs: { capacity: '100kVA', runtime: '15min', efficiency: '96%' }
      },
      {
        id: 'cooling_01',
        name: 'Primary HVAC Unit',
        type: 'cooling',
        status: 'operational',
        health: 87,
        uptime: 4320, // 180 days
        lastMaintenance: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: 'HVAC Room 1',
        specs: { capacity: '50 tons', efficiency: 'SEER 16', refrigerant: 'R-410A' }
      },
      {
        id: 'network_01',
        name: 'Core Network Switch',
        type: 'network',
        status: 'operational',
        health: 96,
        uptime: 5040, // 210 days
        lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        location: 'Network Rack',
        specs: { ports: '48x1GbE + 4x10GbE', throughput: '100Gbps', protocol: 'Layer 3' }
      },
      {
        id: 'security_01',
        name: 'Access Control System',
        type: 'security',
        status: 'operational',
        health: 99,
        uptime: 6120, // 255 days
        lastMaintenance: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        nextMaintenance: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        location: 'Security Office',
        specs: { cameras: '24x4K', storage: '30TB NVR', facial_recognition: 'Enabled' }
      }
    ];
    
    return equipment;
  }

  public static generateSecurityEvents(): SecurityEvent[] {
    const events: SecurityEvent[] = [
      {
        id: 'sec_001',
        type: 'access_attempt',
        severity: 'low',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        location: 'Main Entrance',
        description: 'Badge access attempt - John Smith',
        status: 'resolved'
      },
      {
        id: 'sec_002',
        type: 'intrusion_detected',
        severity: 'high',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        location: 'Server Room B',
        description: 'Motion detected outside authorized hours',
        status: 'investigating'
      },
      {
        id: 'sec_003',
        type: 'unauthorized_access',
        severity: 'critical',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        location: 'Network Cabinet',
        description: 'Unauthorized device connected to network',
        status: 'detected'
      }
    ];
    
    return events;
  }

  public static generatePredictiveAlerts(): PredictiveAlert[] {
    const alerts: PredictiveAlert[] = [
      {
        id: 'pred_001',
        equipmentId: 'ups_01',
        type: 'maintenance_due',
        severity: 'medium',
        probability: 85,
        estimatedTime: 168, // 7 days
        description: 'UPS battery replacement recommended',
        recommendation: 'Schedule maintenance within next week',
        timestamp: new Date()
      },
      {
        id: 'pred_002',
        equipmentId: 'cooling_01',
        type: 'performance_degradation',
        severity: 'low',
        probability: 65,
        estimatedTime: 720, // 30 days
        description: 'HVAC efficiency declining gradually',
        recommendation: 'Inspect air filters and coils',
        timestamp: new Date()
      },
      {
        id: 'pred_003',
        equipmentId: 'server_01',
        type: 'failure_predicted',
        severity: 'high',
        probability: 92,
        estimatedTime: 72, // 3 days
        description: 'Hard drive showing signs of failure',
        recommendation: 'Immediate backup and drive replacement',
        timestamp: new Date()
      }
    ];
    
    return alerts;
  }
}

// Export the generator and some sample data
export const sensorDataGenerator = SensorDataGenerator;

// Real-time data simulation
export class RealTimeDataSimulator {
  private static updateInterval: number | null = null;
  private static subscribers: ((data: SensorReading[]) => void)[] = [];

  public static startSimulation(intervalMs: number = 5000) {
    this.updateInterval = setInterval(() => {
      const newReadings = SensorDataGenerator.generateSensorReadings(20);
      this.subscribers.forEach(callback => callback(newReadings));
    }, intervalMs);
  }

  public static stopSimulation() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  public static subscribe(callback: (data: SensorReading[]) => void) {
    this.subscribers.push(callback);
  }

  public static unsubscribe(callback: (data: SensorReading[]) => void) {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
  }
}

// Initial data exports
export const initialSensorData = SensorDataGenerator.generateSensorReadings(100);
export const equipmentStatusData = SensorDataGenerator.generateEquipmentStatus();
export const securityEventsData = SensorDataGenerator.generateSecurityEvents();
export const predictiveAlertsData = SensorDataGenerator.generatePredictiveAlerts(); 