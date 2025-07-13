import React, { useState, useEffect } from 'react';
import { 
  initialSensorData, 
  equipmentStatusData, 
  securityEventsData, 
  predictiveAlertsData,
  RealTimeDataSimulator
} from '../data/mock-sensors';
import type { 
  SensorReading,
  EquipmentStatus,
  SecurityEvent,
  PredictiveAlert
} from '../data/mock-sensors';

interface IoTDashboardProps {
  language: 'en' | 'ar';
}

const IoTDashboard: React.FC<IoTDashboardProps> = ({ language }) => {
  const [sensorData, setSensorData] = useState<SensorReading[]>(initialSensorData);
  const [equipmentStatus, setEquipmentStatus] = useState<EquipmentStatus[]>(equipmentStatusData);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(securityEventsData);
  const [predictiveAlerts, setPredictiveAlerts] = useState<PredictiveAlert[]>(predictiveAlertsData);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);

  const translations = {
    en: {
      title: 'IoT Command Center',
      realTimeData: 'Real-Time Sensor Data',
      equipmentHealth: 'Equipment Health Status',
      securityMonitor: 'Security Monitor',
      predictiveAnalytics: 'Predictive Analytics',
      enableRealTime: 'Enable Real-Time',
      disableRealTime: 'Disable Real-Time',
      temperature: 'Temperature',
      humidity: 'Humidity',
      power: 'Power',
      network: 'Network',
      airQuality: 'Air Quality',
      vibration: 'Vibration',
      operational: 'Operational',
      warning: 'Warning',
      critical: 'Critical',
      maintenance: 'Maintenance',
      health: 'Health',
      uptime: 'Uptime',
      lastMaintenance: 'Last Maintenance',
      nextMaintenance: 'Next Maintenance',
      location: 'Location',
      severity: 'Severity',
      status: 'Status',
      timestamp: 'Timestamp',
      description: 'Description',
      probability: 'Probability',
      estimatedTime: 'Estimated Time',
      recommendation: 'Recommendation',
      days: 'days',
      hours: 'hours'
    },
    ar: {
      title: 'مركز قيادة إنترنت الأشياء',
      realTimeData: 'بيانات المستشعرات الفورية',
      equipmentHealth: 'حالة صحة المعدات',
      securityMonitor: 'مراقب الأمان',
      predictiveAnalytics: 'التحليلات التنبؤية',
      enableRealTime: 'تفعيل الوقت الفعلي',
      disableRealTime: 'إيقاف الوقت الفعلي',
      temperature: 'درجة الحرارة',
      humidity: 'الرطوبة',
      power: 'الطاقة',
      network: 'الشبكة',
      airQuality: 'جودة الهواء',
      vibration: 'الاهتزاز',
      operational: 'تشغيلي',
      warning: 'تحذير',
      critical: 'حرج',
      maintenance: 'صيانة',
      health: 'الصحة',
      uptime: 'وقت التشغيل',
      lastMaintenance: 'آخر صيانة',
      nextMaintenance: 'الصيانة القادمة',
      location: 'الموقع',
      severity: 'الخطورة',
      status: 'الحالة',
      timestamp: 'الوقت',
      description: 'الوصف',
      probability: 'الاحتمالية',
      estimatedTime: 'الوقت المقدر',
      recommendation: 'التوصية',
      days: 'أيام',
      hours: 'ساعات'
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (isRealTimeEnabled) {
      const updateData = (newReadings: SensorReading[]) => {
        setSensorData(prev => [...newReadings, ...prev.slice(0, 80)]);
      };

      RealTimeDataSimulator.subscribe(updateData);
      RealTimeDataSimulator.startSimulation(3000);

      return () => {
        RealTimeDataSimulator.unsubscribe(updateData);
        RealTimeDataSimulator.stopSimulation();
      };
    }
  }, [isRealTimeEnabled]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'operational':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'warning':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'critical':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'maintenance':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-400 bg-green-400/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'high':
        return 'text-orange-400 bg-orange-400/10';
      case 'critical':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatUptime = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days} ${t.days}, ${remainingHours} ${t.hours}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Group sensors by type for better visualization
  const sensorsByType = sensorData.reduce((acc, sensor) => {
    if (!acc[sensor.type]) acc[sensor.type] = [];
    acc[sensor.type].push(sensor);
    return acc;
  }, {} as Record<string, SensorReading[]>);

  const sensorTypeIcons = {
    temperature: '🌡️',
    humidity: '💧',
    power: '⚡',
    network: '📡',
    air_quality: '🌬️',
    vibration: '📳'
  };

  return (
    <div className="iot-dashboard" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="iot-header">
        <h1>{t.title}</h1>
        <button
          className={`real-time-toggle ${isRealTimeEnabled ? 'active' : ''}`}
          onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
        >
          <span className="toggle-indicator"></span>
          {isRealTimeEnabled ? t.disableRealTime : t.enableRealTime}
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Real-Time Sensor Data Section */}
        <div className="dashboard-card sensor-data-card">
          <h2>{t.realTimeData}</h2>
          <div className="sensor-grid">
            {Object.entries(sensorsByType).map(([type, sensors]) => {
              const latestSensor = sensors[0];
              const avgValue = sensors.slice(0, 5).reduce((sum, s) => sum + s.value, 0) / Math.min(5, sensors.length);
              
              return (
                <div key={type} className={`sensor-tile ${getStatusColor(latestSensor.status)}`}>
                  <div className="sensor-header">
                    <span className="sensor-icon">{sensorTypeIcons[type as keyof typeof sensorTypeIcons]}</span>
                    <span className="sensor-type">{t[type as keyof typeof t] || type}</span>
                  </div>
                  <div className="sensor-value">
                    {avgValue.toFixed(1)} {latestSensor.unit}
                  </div>
                  <div className="sensor-status">
                    <span className={`status-badge ${getStatusColor(latestSensor.status)}`}>
                      {t[latestSensor.status as keyof typeof t] || latestSensor.status}
                    </span>
                  </div>
                  <div className="sensor-location">{latestSensor.location}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipment Health Status */}
        <div className="dashboard-card equipment-card">
          <h2>{t.equipmentHealth}</h2>
          <div className="equipment-list">
            {equipmentStatus.map((equipment) => (
              <div key={equipment.id} className={`equipment-item ${getStatusColor(equipment.status)}`}>
                <div className="equipment-header">
                  <h3>{equipment.name}</h3>
                  <span className={`status-badge ${getStatusColor(equipment.status)}`}>
                    {t[equipment.status as keyof typeof t] || equipment.status}
                  </span>
                </div>
                <div className="equipment-details">
                  <div className="health-bar">
                    <div className="health-label">{t.health}: {equipment.health}%</div>
                    <div className="health-progress">
                      <div 
                        className="health-fill" 
                        style={{ 
                          width: `${equipment.health}%`,
                          backgroundColor: equipment.health > 80 ? '#10b981' : equipment.health > 60 ? '#f59e0b' : '#ef4444'
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="equipment-info">
                    <div><strong>{t.uptime}:</strong> {formatUptime(equipment.uptime)}</div>
                    <div><strong>{t.location}:</strong> {equipment.location}</div>
                    <div><strong>{t.nextMaintenance}:</strong> {formatDate(equipment.nextMaintenance)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Monitor */}
        <div className="dashboard-card security-card">
          <h2>{t.securityMonitor}</h2>
          <div className="security-events">
            {securityEvents.map((event) => (
              <div key={event.id} className={`security-event ${getSeverityColor(event.severity)}`}>
                <div className="event-header">
                  <span className={`severity-badge ${getSeverityColor(event.severity)}`}>
                    {event.severity.toUpperCase()}
                  </span>
                  <span className="event-time">{formatDate(event.timestamp)}</span>
                </div>
                <div className="event-content">
                  <div className="event-type">{event.type.replace('_', ' ').toUpperCase()}</div>
                  <div className="event-location">{t.location}: {event.location}</div>
                  <div className="event-description">{event.description}</div>
                  <div className={`event-status status-${event.status}`}>
                    {t.status}: {event.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="dashboard-card analytics-card">
          <h2>{t.predictiveAnalytics}</h2>
          <div className="predictive-alerts">
            {predictiveAlerts.map((alert) => (
              <div key={alert.id} className={`predictive-alert ${getSeverityColor(alert.severity)}`}>
                <div className="alert-header">
                  <span className={`severity-badge ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="alert-probability">{t.probability}: {alert.probability}%</span>
                </div>
                <div className="alert-content">
                  <div className="alert-type">{alert.type.replace('_', ' ').toUpperCase()}</div>
                  <div className="alert-equipment">Equipment: {alert.equipmentId}</div>
                  <div className="alert-time">
                    {t.estimatedTime}: {Math.floor(alert.estimatedTime / 24)} {t.days} {alert.estimatedTime % 24} {t.hours}
                  </div>
                  <div className="alert-description">{alert.description}</div>
                  <div className="alert-recommendation">
                    <strong>{t.recommendation}:</strong> {alert.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTDashboard; 