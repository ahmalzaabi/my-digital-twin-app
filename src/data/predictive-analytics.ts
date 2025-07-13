// Predictive Analytics Module - AI-Powered Equipment Failure Forecasting

export interface PredictiveModel {
  id: string;
  name: string;
  type: 'neural_network' | 'random_forest' | 'svm' | 'lstm' | 'ensemble';
  accuracy: number;
  confidence: number;
  lastTrained: Date;
  dataPoints: number;
  version: string;
}

export interface EquipmentPrediction {
  equipmentId: string;
  equipmentName: string;
  failureProbability: number;
  timeToFailure: number; // days
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  predictedFailureType: string;
  confidenceInterval: [number, number];
  maintenanceWindow: Date;
  costImpact: number;
  recommendations: string[];
  trend: 'improving' | 'stable' | 'degrading';
}

export interface MaintenanceSchedule {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'predictive' | 'corrective' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  scheduledDate: Date;
  estimatedDuration: number; // hours
  requiredPersonnel: number;
  estimatedCost: number;
  description: string;
  prerequisites: string[];
  riskReduction: number; // percentage
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
}

export interface PerformanceMetrics {
  equipmentId: string;
  efficiency: number;
  reliability: number;
  availability: number;
  maintenanceCost: number;
  downtimeHours: number;
  mtbf: number; // Mean Time Between Failures (hours)
  mttr: number; // Mean Time To Repair (hours)
  oee: number; // Overall Equipment Effectiveness
  trend: number[]; // Historical performance data
}

export interface RiskAssessment {
  id: string;
  equipmentId: string;
  riskScore: number;
  riskCategory: 'operational' | 'safety' | 'environmental' | 'financial';
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  likelihood: number;
  consequence: number;
  mitigationActions: string[];
  owner: string;
  lastReviewed: Date;
  nextReview: Date;
}

export interface AIInsight {
  id: string;
  type: 'anomaly' | 'trend' | 'pattern' | 'prediction' | 'optimization';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  confidence: number;
  affectedEquipment: string[];
  recommendedActions: string[];
  potentialSavings: number;
  timeframe: string;
  generatedAt: Date;
}

class PredictiveAnalyticsEngine {
  private models: PredictiveModel[] = [
    {
      id: 'neural_net_v3',
      name: 'Deep Neural Network - Equipment Health',
      type: 'neural_network',
      accuracy: 94.2,
      confidence: 87.5,
      lastTrained: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      dataPoints: 450000,
      version: '3.2.1'
    },
    {
      id: 'ensemble_v2',
      name: 'Ensemble Model - Failure Prediction',
      type: 'ensemble',
      accuracy: 91.8,
      confidence: 92.3,
      lastTrained: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      dataPoints: 380000,
      version: '2.1.0'
    },
    {
      id: 'lstm_v1',
      name: 'LSTM - Time Series Forecasting',
      type: 'lstm',
      accuracy: 89.7,
      confidence: 85.1,
      lastTrained: new Date(Date.now() - 6 * 60 * 60 * 1000),
      dataPoints: 520000,
      version: '1.4.3'
    }
  ];

  private equipmentData = [
    {
      id: 'eq_001',
      name: 'Primary Database Server',
      type: 'server',
      criticalityLevel: 'critical',
      location: 'Server Room A-1',
      installedDate: new Date('2020-03-15'),
      lastMaintenance: new Date('2024-01-15')
    },
    {
      id: 'eq_002',
      name: 'Main UPS System',
      type: 'power',
      criticalityLevel: 'critical',
      location: 'Power Room B-2',
      installedDate: new Date('2019-11-20'),
      lastMaintenance: new Date('2024-01-10')
    },
    {
      id: 'eq_003',
      name: 'Primary HVAC Unit',
      type: 'cooling',
      criticalityLevel: 'high',
      location: 'Mechanical Room C-1',
      installedDate: new Date('2021-07-08'),
      lastMaintenance: new Date('2024-01-20')
    },
    {
      id: 'eq_004',
      name: 'Core Network Switch',
      type: 'network',
      criticalityLevel: 'high',
      location: 'Network Room D-3',
      installedDate: new Date('2022-01-12'),
      lastMaintenance: new Date('2024-01-25')
    },
    {
      id: 'eq_005',
      name: 'Access Control System',
      type: 'security',
      criticalityLevel: 'medium',
      location: 'Security Office E-1',
      installedDate: new Date('2021-09-30'),
      lastMaintenance: new Date('2024-02-01')
    }
  ];

  generatePredictions(): EquipmentPrediction[] {
    return this.equipmentData.map(equipment => {
      const ageDays = Math.floor((Date.now() - equipment.installedDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysSinceLastMaintenance = Math.floor((Date.now() - equipment.lastMaintenance.getTime()) / (1000 * 60 * 60 * 24));
      
      // Simulate AI prediction calculations
      const baseProbability = Math.min(ageDays / 1800, 0.85); // Age factor
      const maintenanceFactor = Math.min(daysSinceLastMaintenance / 365, 0.3); // Maintenance factor
      const criticalityMultiplier = equipment.criticalityLevel === 'critical' ? 1.2 : 
                                   equipment.criticalityLevel === 'high' ? 1.0 : 0.8;
      
      const failureProbability = Math.min((baseProbability + maintenanceFactor) * criticalityMultiplier, 0.95);
      const timeToFailure = Math.max(30, Math.floor(365 * (1 - failureProbability) + Math.random() * 200));
      
      const riskLevel = failureProbability > 0.7 ? 'critical' :
                       failureProbability > 0.5 ? 'high' :
                       failureProbability > 0.3 ? 'medium' : 'low';

      const failureTypes = {
        server: ['Hard Drive Failure', 'Memory Corruption', 'Cooling System Failure', 'Power Supply Issues'],
        power: ['Battery Degradation', 'Inverter Failure', 'Capacitor Aging', 'Overload Protection'],
        cooling: ['Compressor Failure', 'Refrigerant Leak', 'Fan Motor Issues', 'Thermostat Malfunction'],
        network: ['Port Failure', 'Firmware Corruption', 'Power Module Issues', 'Switch Fabric Errors'],
        security: ['Sensor Malfunction', 'Communication Failure', 'Database Issues', 'Authentication Errors']
      };

      const recommendations = [
        `Schedule preventive maintenance within ${Math.floor(timeToFailure * 0.7)} days`,
        `Increase monitoring frequency for ${equipment.name}`,
        `Order replacement parts for critical components`,
        `Implement backup procedures for ${equipment.type} systems`,
        `Review and update maintenance procedures`
      ];

      return {
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        failureProbability: Math.round(failureProbability * 100) / 100,
        timeToFailure,
        riskLevel,
        predictedFailureType: failureTypes[equipment.type as keyof typeof failureTypes][Math.floor(Math.random() * 4)],
        confidenceInterval: [
          Math.max(0, failureProbability - 0.15),
          Math.min(1, failureProbability + 0.15)
        ],
        maintenanceWindow: new Date(Date.now() + timeToFailure * 0.6 * 24 * 60 * 60 * 1000),
        costImpact: Math.floor(50000 + failureProbability * 200000),
        recommendations: recommendations.slice(0, 3 + Math.floor(Math.random() * 3)),
        trend: failureProbability > 0.6 ? 'degrading' : 
               failureProbability > 0.3 ? 'stable' : 'improving'
      };
    });
  }

  generateMaintenanceSchedule(): MaintenanceSchedule[] {
    const schedules: MaintenanceSchedule[] = [];
    
    this.equipmentData.forEach((equipment, index) => {
      const daysOffset = [7, 14, 21, 28, 35][index];
      const types: ('preventive' | 'predictive' | 'corrective')[] = ['preventive', 'predictive', 'corrective'];
      const priorities: ('low' | 'medium' | 'high' | 'critical')[] = ['medium', 'high', 'critical', 'high', 'medium'];
      
      schedules.push({
        id: `maint_${equipment.id}`,
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        type: types[Math.floor(Math.random() * types.length)],
        priority: priorities[index],
        scheduledDate: new Date(Date.now() + daysOffset * 24 * 60 * 60 * 1000),
        estimatedDuration: 2 + Math.floor(Math.random() * 6),
        requiredPersonnel: 1 + Math.floor(Math.random() * 3),
        estimatedCost: 5000 + Math.floor(Math.random() * 15000),
        description: `Scheduled maintenance for ${equipment.name} - ${equipment.type} system`,
        prerequisites: [
          'System backup completed',
          'Replacement parts available',
          'Technical documentation reviewed'
        ],
        riskReduction: 75 + Math.floor(Math.random() * 20),
        status: 'scheduled'
      });
    });
    
    return schedules;
  }

  generatePerformanceMetrics(): PerformanceMetrics[] {
    return this.equipmentData.map(equipment => {
      const baseEfficiency = 85 + Math.random() * 10;
      const reliability = 90 + Math.random() * 8;
      const availability = 98 + Math.random() * 2;
      
      return {
        equipmentId: equipment.id,
        efficiency: Math.round(baseEfficiency * 100) / 100,
        reliability: Math.round(reliability * 100) / 100,
        availability: Math.round(availability * 100) / 100,
        maintenanceCost: 25000 + Math.floor(Math.random() * 50000),
        downtimeHours: Math.floor(Math.random() * 48),
        mtbf: 2000 + Math.floor(Math.random() * 3000),
        mttr: 2 + Math.floor(Math.random() * 8),
        oee: Math.round((baseEfficiency * reliability * availability / 10000) * 100) / 100,
        trend: Array.from({length: 12}, () => 85 + Math.random() * 15)
      };
    });
  }

  generateRiskAssessments(): RiskAssessment[] {
    const riskCategories: ('operational' | 'safety' | 'environmental' | 'financial')[] = 
      ['operational', 'safety', 'environmental', 'financial'];
    
    return this.equipmentData.map(equipment => {
      const likelihood = Math.random() * 5 + 1;
      const consequence = Math.random() * 5 + 1;
      const riskScore = likelihood * consequence;
      
      return {
        id: `risk_${equipment.id}`,
        equipmentId: equipment.id,
        riskScore: Math.round(riskScore * 100) / 100,
        riskCategory: riskCategories[Math.floor(Math.random() * riskCategories.length)],
        impactLevel: riskScore > 20 ? 'critical' : riskScore > 15 ? 'high' : riskScore > 10 ? 'medium' : 'low',
        likelihood: Math.round(likelihood * 100) / 100,
        consequence: Math.round(consequence * 100) / 100,
        mitigationActions: [
          'Implement additional monitoring',
          'Increase maintenance frequency',
          'Install backup systems',
          'Update emergency procedures'
        ],
        owner: 'Maintenance Team',
        lastReviewed: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        nextReview: new Date(Date.now() + (90 + Math.floor(Math.random() * 90)) * 24 * 60 * 60 * 1000)
      };
    });
  }

  generateAIInsights(): AIInsight[] {
    const insights: AIInsight[] = [
      {
        id: 'insight_001',
        type: 'anomaly',
        title: 'Unusual Power Consumption Pattern Detected',
        description: 'AI detected abnormal power consumption in Server Room A-1 during off-peak hours',
        severity: 'warning',
        confidence: 87.3,
        affectedEquipment: ['eq_001', 'eq_002'],
        recommendedActions: [
          'Investigate after-hours system activity',
          'Check for unauthorized access',
          'Review power management settings'
        ],
        potentialSavings: 15000,
        timeframe: '2-4 weeks',
        generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'insight_002',
        type: 'prediction',
        title: 'HVAC System Efficiency Degradation Forecast',
        description: 'ML model predicts 12% efficiency drop in cooling systems over next 6 months',
        severity: 'error',
        confidence: 92.1,
        affectedEquipment: ['eq_003'],
        recommendedActions: [
          'Schedule coil cleaning',
          'Replace aging filters',
          'Calibrate temperature sensors'
        ],
        potentialSavings: 35000,
        timeframe: '6 months',
        generatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: 'insight_003',
        type: 'optimization',
        title: 'Maintenance Schedule Optimization Opportunity',
        description: 'AI suggests consolidating maintenance windows to reduce downtime by 40%',
        severity: 'info',
        confidence: 89.7,
        affectedEquipment: ['eq_001', 'eq_004', 'eq_005'],
        recommendedActions: [
          'Coordinate maintenance schedules',
          'Implement predictive maintenance',
          'Optimize resource allocation'
        ],
        potentialSavings: 25000,
        timeframe: '3 months',
        generatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ];
    
    return insights;
  }

  getModels(): PredictiveModel[] {
    return this.models;
  }

  updateModelAccuracy(modelId: string, newAccuracy: number): void {
    const model = this.models.find(m => m.id === modelId);
    if (model) {
      model.accuracy = newAccuracy;
      model.lastTrained = new Date();
    }
  }
}

export const predictiveAnalytics = new PredictiveAnalyticsEngine(); 