// EkkoSense-inspired AI Cooling Advisor System
export interface CoolingRecommendation {
  id: string;
  type: 'temperature' | 'airflow' | 'efficiency' | 'capacity' | 'maintenance';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: {
    energySavings: number; // kW
    costSavings: number; // USD per month
    carbonReduction: number; // kg CO2 per year
    riskReduction: number; // percentage
  };
  implementation: {
    effort: 'low' | 'medium' | 'high';
    timeframe: string;
    cost: number; // USD
    steps: string[];
  };
  affectedEquipment: string[];
  metrics: {
    currentValue: number;
    targetValue: number;
    unit: string;
    improvement: number; // percentage
  };
  confidence: number; // AI confidence percentage
  generatedAt: Date;
}

export interface ThermalAnalysis {
  zone: string;
  location: string;
  currentTemp: number;
  targetTemp: number;
  deltaT: number;
  airflowRate: number; // CFM
  coolingLoad: number; // kW
  efficiency: number; // percentage
  status: 'optimal' | 'warning' | 'critical';
  recommendations: string[];
}

export interface CoolingUnit {
  id: string;
  name: string;
  type: 'CRAC' | 'AHU' | 'InRow' | 'Chiller';
  location: string;
  capacity: number; // kW
  currentLoad: number; // kW
  utilization: number; // percentage
  efficiency: number; // COP or EER
  temperature: {
    supply: number;
    return: number;
    setpoint: number;
  };
  airflow: {
    current: number; // CFM
    maximum: number; // CFM
  };
  power: {
    consumption: number; // kW
    efficiency: number; // percentage
  };
  status: 'optimal' | 'warning' | 'critical' | 'maintenance';
  lastMaintenance: Date;
  nextMaintenance: Date;
  alerts: string[];
}

export interface EnergyOptimization {
  currentPUE: number;
  targetPUE: number;
  potentialSavings: {
    energy: number; // kWh per year
    cost: number; // USD per year
    carbon: number; // kg CO2 per year
  };
  recommendations: {
    shortTerm: CoolingRecommendation[];
    longTerm: CoolingRecommendation[];
  };
  seasonalAdjustments: {
    summer: { setpoint: number; efficiency: number };
    winter: { setpoint: number; efficiency: number };
    spring: { setpoint: number; efficiency: number };
    fall: { setpoint: number; efficiency: number };
  };
}

export interface CoolingAdvisorMetrics {
  totalCoolingCapacity: number; // kW
  currentCoolingLoad: number; // kW
  strangedCapacity: number; // kW
  averageUtilization: number; // percentage
  coolingEfficiency: number; // percentage
  energyConsumption: number; // kWh per day
  carbonFootprint: number; // kg CO2 per day
  estimatedCost: number; // USD per day
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  optimizationPotential: number; // percentage
}

class CoolingAdvisorEngine {
  private coolingUnits: CoolingUnit[] = [];
  private thermalZones: ThermalAnalysis[] = [];
  private recommendations: CoolingRecommendation[] = [];

  constructor() {
    this.initializeCoolingUnits();
    this.initializeThermalZones();
    this.generateRecommendations();
  }

  private initializeCoolingUnits(): void {
    this.coolingUnits = [
      {
        id: 'crac-01',
        name: 'CRAC Unit A1',
        type: 'CRAC',
        location: 'Server Room A - North',
        capacity: 150,
        currentLoad: 125,
        utilization: 83.3,
        efficiency: 2.8,
        temperature: {
          supply: 18.5,
          return: 24.2,
          setpoint: 19.0
        },
        airflow: {
          current: 8500,
          maximum: 10000
        },
        power: {
          consumption: 44.6,
          efficiency: 87.2
        },
        status: 'warning',
        lastMaintenance: new Date('2024-12-01'),
        nextMaintenance: new Date('2025-03-01'),
        alerts: ['High utilization detected', 'Supply temperature below setpoint']
      },
      {
        id: 'crac-02',
        name: 'CRAC Unit A2',
        type: 'CRAC',
        location: 'Server Room A - South',
        capacity: 150,
        currentLoad: 95,
        utilization: 63.3,
        efficiency: 3.2,
        temperature: {
          supply: 19.8,
          return: 25.1,
          setpoint: 20.0
        },
        airflow: {
          current: 6800,
          maximum: 10000
        },
        power: {
          consumption: 29.7,
          efficiency: 91.5
        },
        status: 'optimal',
        lastMaintenance: new Date('2024-11-15'),
        nextMaintenance: new Date('2025-02-15'),
        alerts: []
      },
      {
        id: 'ahu-01',
        name: 'Air Handler Unit B1',
        type: 'AHU',
        location: 'Server Room B - Central',
        capacity: 200,
        currentLoad: 165,
        utilization: 82.5,
        efficiency: 3.5,
        temperature: {
          supply: 17.2,
          return: 23.8,
          setpoint: 18.0
        },
        airflow: {
          current: 12000,
          maximum: 15000
        },
        power: {
          consumption: 47.1,
          efficiency: 89.8
        },
        status: 'critical',
        lastMaintenance: new Date('2024-10-20'),
        nextMaintenance: new Date('2025-01-20'),
        alerts: ['Urgent maintenance required', 'High power consumption', 'Supply temperature low']
      },
      {
        id: 'inrow-01',
        name: 'InRow Cooling Unit C1',
        type: 'InRow',
        location: 'High Density Zone C',
        capacity: 75,
        currentLoad: 68,
        utilization: 90.7,
        efficiency: 2.9,
        temperature: {
          supply: 20.5,
          return: 28.3,
          setpoint: 21.0
        },
        airflow: {
          current: 3800,
          maximum: 4200
        },
        power: {
          consumption: 23.4,
          efficiency: 85.1
        },
        status: 'warning',
        lastMaintenance: new Date('2024-12-10'),
        nextMaintenance: new Date('2025-03-10'),
        alerts: ['Approaching capacity limit', 'High return temperature']
      }
    ];
  }

  private initializeThermalZones(): void {
    this.thermalZones = [
      {
        zone: 'Zone A',
        location: 'Server Room A',
        currentTemp: 21.8,
        targetTemp: 22.0,
        deltaT: 5.7,
        airflowRate: 15300,
        coolingLoad: 220,
        efficiency: 89.5,
        status: 'optimal',
        recommendations: [
          'Maintain current temperature setpoints',
          'Consider optimizing airflow distribution'
        ]
      },
      {
        zone: 'Zone B',
        location: 'Server Room B',
        currentTemp: 24.2,
        targetTemp: 22.0,
        deltaT: 6.6,
        airflowRate: 12000,
        coolingLoad: 165,
        efficiency: 76.3,
        status: 'warning',
        recommendations: [
          'Reduce temperature setpoint by 1°C',
          'Increase airflow to improve heat transfer',
          'Check for hot spots and airflow blockages'
        ]
      },
      {
        zone: 'Zone C',
        location: 'High Density Zone C',
        currentTemp: 26.1,
        targetTemp: 23.0,
        deltaT: 7.8,
        airflowRate: 3800,
        coolingLoad: 68,
        efficiency: 68.9,
        status: 'critical',
        recommendations: [
          'Immediate temperature reduction required',
          'Consider additional cooling capacity',
          'Implement hot aisle containment',
          'Review server placement and airflow patterns'
        ]
      }
    ];
  }

  private generateRecommendations(): void {
    this.recommendations = [
      {
        id: 'rec-001',
        type: 'temperature',
        priority: 'critical',
        title: 'Optimize Zone C Temperature Management',
        description: 'Zone C is operating 3.1°C above target temperature, creating thermal stress on equipment and reducing efficiency.',
        impact: {
          energySavings: 12.5,
          costSavings: 1800,
          carbonReduction: 5400,
          riskReduction: 35
        },
        implementation: {
          effort: 'medium',
          timeframe: '2-3 days',
          cost: 8500,
          steps: [
            'Install hot aisle containment system',
            'Adjust CRAC setpoints to 21°C',
            'Reposition servers for optimal airflow',
            'Monitor temperature trends for 48 hours'
          ]
        },
        affectedEquipment: ['inrow-01', 'servers-zone-c'],
        metrics: {
          currentValue: 26.1,
          targetValue: 23.0,
          unit: '°C',
          improvement: 12.0
        },
        confidence: 94.2,
        generatedAt: new Date()
      },
      {
        id: 'rec-002',
        type: 'efficiency',
        priority: 'high',
        title: 'Improve CRAC Unit A1 Efficiency',
        description: 'CRAC Unit A1 is operating at 83% utilization with decreasing efficiency. Load balancing with A2 will improve overall performance.',
        impact: {
          energySavings: 8.3,
          costSavings: 1200,
          carbonReduction: 3600,
          riskReduction: 20
        },
        implementation: {
          effort: 'low',
          timeframe: '1 day',
          cost: 0,
          steps: [
            'Adjust CRAC A1 setpoint to 20°C',
            'Increase CRAC A2 setpoint to 19°C',
            'Monitor load distribution for 24 hours',
            'Fine-tune based on performance metrics'
          ]
        },
        affectedEquipment: ['crac-01', 'crac-02'],
        metrics: {
          currentValue: 83.3,
          targetValue: 75.0,
          unit: '%',
          improvement: 10.0
        },
        confidence: 91.8,
        generatedAt: new Date()
      },
      {
        id: 'rec-003',
        type: 'maintenance',
        priority: 'high',
        title: 'Schedule Urgent Maintenance for AHU-01',
        description: 'Air Handler Unit B1 shows signs of degraded performance and high power consumption. Immediate maintenance required.',
        impact: {
          energySavings: 15.2,
          costSavings: 2200,
          carbonReduction: 6500,
          riskReduction: 45
        },
        implementation: {
          effort: 'high',
          timeframe: '1 week',
          cost: 12000,
          steps: [
            'Schedule maintenance window',
            'Replace air filters and coils',
            'Calibrate temperature sensors',
            'Verify refrigerant levels',
            'Test all safety systems'
          ]
        },
        affectedEquipment: ['ahu-01'],
        metrics: {
          currentValue: 47.1,
          targetValue: 38.5,
          unit: 'kW',
          improvement: 18.2
        },
        confidence: 96.7,
        generatedAt: new Date()
      },
      {
        id: 'rec-004',
        type: 'capacity',
        priority: 'medium',
        title: 'Release Stranded Cooling Capacity',
        description: 'Analysis shows 45kW of stranded cooling capacity that can be released through optimized setpoints and airflow management.',
        impact: {
          energySavings: 22.1,
          costSavings: 3200,
          carbonReduction: 9800,
          riskReduction: 15
        },
        implementation: {
          effort: 'medium',
          timeframe: '3-5 days',
          cost: 5500,
          steps: [
            'Implement AI-driven setpoint optimization',
            'Install airflow sensors at critical points',
            'Configure automated load balancing',
            'Deploy predictive cooling algorithms'
          ]
        },
        affectedEquipment: ['crac-01', 'crac-02', 'ahu-01'],
        metrics: {
          currentValue: 45.0,
          targetValue: 25.0,
          unit: 'kW stranded',
          improvement: 44.4
        },
        confidence: 89.3,
        generatedAt: new Date()
      },
      {
        id: 'rec-005',
        type: 'airflow',
        priority: 'medium',
        title: 'Optimize Airflow Distribution',
        description: 'Uneven airflow distribution is causing hot spots and reducing cooling efficiency. Implement dynamic airflow management.',
        impact: {
          energySavings: 6.8,
          costSavings: 980,
          carbonReduction: 2900,
          riskReduction: 25
        },
        implementation: {
          effort: 'medium',
          timeframe: '2-4 days',
          cost: 7200,
          steps: [
            'Install intelligent damper systems',
            'Deploy airflow visualization tools',
            'Configure automated airflow balancing',
            'Set up continuous monitoring'
          ]
        },
        affectedEquipment: ['crac-01', 'crac-02', 'inrow-01'],
        metrics: {
          currentValue: 68.5,
          targetValue: 85.0,
          unit: '% efficiency',
          improvement: 24.1
        },
        confidence: 87.6,
        generatedAt: new Date()
      }
    ];
  }

  getRecommendations(): CoolingRecommendation[] {
    return this.recommendations.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  getCoolingUnits(): CoolingUnit[] {
    return this.coolingUnits;
  }

  getThermalAnalysis(): ThermalAnalysis[] {
    return this.thermalZones;
  }

  getMetrics(): CoolingAdvisorMetrics {
    const totalCapacity = this.coolingUnits.reduce((sum, unit) => sum + unit.capacity, 0);
    const currentLoad = this.coolingUnits.reduce((sum, unit) => sum + unit.currentLoad, 0);
    const strangedCapacity = totalCapacity - currentLoad;
    const avgUtilization = (currentLoad / totalCapacity) * 100;
    const totalPower = this.coolingUnits.reduce((sum, unit) => sum + unit.power.consumption, 0);
    const avgEfficiency = this.coolingUnits.reduce((sum, unit) => sum + unit.efficiency, 0) / this.coolingUnits.length;
    
    return {
      totalCoolingCapacity: totalCapacity,
      currentCoolingLoad: currentLoad,
      strangedCapacity: strangedCapacity,
      averageUtilization: avgUtilization,
      coolingEfficiency: avgEfficiency * 20, // Convert COP to percentage
      energyConsumption: totalPower * 24,
      carbonFootprint: totalPower * 24 * 0.45, // kg CO2 per kWh
      estimatedCost: totalPower * 24 * 0.12, // USD per kWh
      riskLevel: this.calculateRiskLevel(),
      optimizationPotential: this.calculateOptimizationPotential()
    };
  }

  private calculateRiskLevel(): 'low' | 'medium' | 'high' | 'critical' {
    const criticalUnits = this.coolingUnits.filter(u => u.status === 'critical').length;
    const warningUnits = this.coolingUnits.filter(u => u.status === 'warning').length;
    const criticalZones = this.thermalZones.filter(z => z.status === 'critical').length;
    
    if (criticalUnits > 0 || criticalZones > 0) return 'critical';
    if (warningUnits > 1) return 'high';
    if (warningUnits > 0) return 'medium';
    return 'low';
  }

  private calculateOptimizationPotential(): number {
    const potentialSavings = this.recommendations.reduce((sum, rec) => sum + rec.impact.energySavings, 0);
    const currentConsumption = this.coolingUnits.reduce((sum, unit) => sum + unit.power.consumption, 0);
    return (potentialSavings / currentConsumption) * 100;
  }

  getEnergyOptimization(): EnergyOptimization {
    const currentPower = this.coolingUnits.reduce((sum, unit) => sum + unit.power.consumption, 0);
    const itLoad = this.coolingUnits.reduce((sum, unit) => sum + unit.currentLoad, 0);
    const currentPUE = 1 + (currentPower / itLoad);
    
    return {
      currentPUE: currentPUE,
      targetPUE: 1.25,
      potentialSavings: {
        energy: 185000, // kWh per year
        cost: 22200, // USD per year
        carbon: 83250 // kg CO2 per year
      },
      recommendations: {
        shortTerm: this.recommendations.filter(r => r.implementation.effort === 'low'),
        longTerm: this.recommendations.filter(r => r.implementation.effort === 'high')
      },
      seasonalAdjustments: {
        summer: { setpoint: 22.0, efficiency: 85 },
        winter: { setpoint: 24.0, efficiency: 92 },
        spring: { setpoint: 23.0, efficiency: 88 },
        fall: { setpoint: 23.5, efficiency: 90 }
      }
    };
  }
}

export const coolingAdvisor = new CoolingAdvisorEngine(); 