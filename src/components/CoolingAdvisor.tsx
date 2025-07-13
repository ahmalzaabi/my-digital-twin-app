import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coolingAdvisor } from '../data/cooling-advisor';
import type { 
  CoolingRecommendation, 
  CoolingUnit, 
  ThermalAnalysis, 
  CoolingAdvisorMetrics, 
  EnergyOptimization 
} from '../data/cooling-advisor';

interface CoolingAdvisorProps {
  language: 'en' | 'ar';
}

const CoolingAdvisor: React.FC<CoolingAdvisorProps> = ({ language }) => {
  const isRTL = language === 'ar';
  const [recommendations, setRecommendations] = useState<CoolingRecommendation[]>([]);
  const [coolingUnits, setCoolingUnits] = useState<CoolingUnit[]>([]);
  const [thermalAnalysis, setThermalAnalysis] = useState<ThermalAnalysis[]>([]);
  const [metrics, setMetrics] = useState<CoolingAdvisorMetrics | null>(null);
  const [energyOptimization, setEnergyOptimization] = useState<EnergyOptimization | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'thermal' | 'units' | 'optimization'>('overview');
  const [selectedRecommendation, setSelectedRecommendation] = useState<CoolingRecommendation | null>(null);

  useEffect(() => {
    const loadData = () => {
      setRecommendations(coolingAdvisor.getRecommendations());
      setCoolingUnits(coolingAdvisor.getCoolingUnits());
      setThermalAnalysis(coolingAdvisor.getThermalAnalysis());
      setMetrics(coolingAdvisor.getMetrics());
      setEnergyOptimization(coolingAdvisor.getEnergyOptimization());
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const translations = {
    en: {
      title: 'AI Cooling Advisor',
      subtitle: 'Intelligent Cooling Optimization & Energy Management',
      overview: 'Overview',
      recommendations: 'Recommendations',
      thermal: 'Thermal Analysis',
      units: 'Cooling Units',
      optimization: 'Energy Optimization',
      backToMain: 'Back to Main',
      totalCapacity: 'Total Cooling Capacity',
      currentLoad: 'Current Load',
      strangedCapacity: 'Stranded Capacity',
      utilization: 'Utilization',
      efficiency: 'Efficiency',
      energyConsumption: 'Energy Consumption',
      carbonFootprint: 'Carbon Footprint',
      estimatedCost: 'Estimated Cost',
      riskLevel: 'Risk Level',
      optimizationPotential: 'Optimization Potential',
      priority: 'Priority',
      impact: 'Impact',
      energySavings: 'Energy Savings',
      costSavings: 'Cost Savings',
      carbonReduction: 'Carbon Reduction',
      riskReduction: 'Risk Reduction',
      implementation: 'Implementation',
      effort: 'Effort',
      timeframe: 'Timeframe',
      cost: 'Cost',
      confidence: 'AI Confidence',
      steps: 'Implementation Steps',
      affectedEquipment: 'Affected Equipment',
      viewDetails: 'View Details',
      closeDetails: 'Close Details',
      zone: 'Zone',
      location: 'Location',
      currentTemp: 'Current Temperature',
      targetTemp: 'Target Temperature',
      deltaT: 'Delta T',
      airflowRate: 'Airflow Rate',
      coolingLoad: 'Cooling Load',
      status: 'Status',
      unitType: 'Type',
      capacity: 'Capacity',
      temperature: 'Temperature',
      supply: 'Supply',
      return: 'Return',
      setpoint: 'Setpoint',
      airflow: 'Airflow',
      current: 'Current',
      maximum: 'Maximum',
      power: 'Power',
      consumption: 'Consumption',
      lastMaintenance: 'Last Maintenance',
      nextMaintenance: 'Next Maintenance',
      alerts: 'Alerts',
      currentPUE: 'Current PUE',
      targetPUE: 'Target PUE',
      potentialSavings: 'Potential Savings',
      energy: 'Energy',
      shortTerm: 'Short-term Recommendations',
      longTerm: 'Long-term Recommendations',
      seasonalAdjustments: 'Seasonal Adjustments',
      summer: 'Summer',
      winter: 'Winter',
      spring: 'Spring',
      fall: 'Fall',
      optimal: 'Optimal',
      warning: 'Warning',
      critical: 'Critical',
      maintenance: 'Maintenance',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      per: 'per',
      day: 'day',
      month: 'month',
      year: 'year',
      kw: 'kW',
      kwh: 'kWh',
      cfm: 'CFM',
      celsius: '°C',
      usd: 'USD',
      kg: 'kg',
      co2: 'CO2'
    },
    ar: {
      title: 'مستشار التبريد الذكي',
      subtitle: 'تحسين التبريد الذكي وإدارة الطاقة',
      overview: 'نظرة عامة',
      recommendations: 'التوصيات',
      thermal: 'التحليل الحراري',
      units: 'وحدات التبريد',
      optimization: 'تحسين الطاقة',
      backToMain: 'العودة للرئيسية',
      totalCapacity: 'إجمالي قدرة التبريد',
      currentLoad: 'الحمل الحالي',
      strangedCapacity: 'القدرة المعطلة',
      utilization: 'الاستخدام',
      efficiency: 'الكفاءة',
      energyConsumption: 'استهلاك الطاقة',
      carbonFootprint: 'البصمة الكربونية',
      estimatedCost: 'التكلفة المقدرة',
      riskLevel: 'مستوى المخاطر',
      optimizationPotential: 'إمكانية التحسين',
      priority: 'الأولوية',
      impact: 'التأثير',
      energySavings: 'توفير الطاقة',
      costSavings: 'توفير التكلفة',
      carbonReduction: 'تقليل الكربون',
      riskReduction: 'تقليل المخاطر',
      implementation: 'التنفيذ',
      effort: 'الجهد',
      timeframe: 'الإطار الزمني',
      cost: 'التكلفة',
      confidence: 'ثقة الذكاء الاصطناعي',
      steps: 'خطوات التنفيذ',
      affectedEquipment: 'المعدات المتأثرة',
      viewDetails: 'عرض التفاصيل',
      closeDetails: 'إغلاق التفاصيل',
      zone: 'المنطقة',
      location: 'الموقع',
      currentTemp: 'درجة الحرارة الحالية',
      targetTemp: 'درجة الحرارة المستهدفة',
      deltaT: 'فرق درجة الحرارة',
      airflowRate: 'معدل تدفق الهواء',
      coolingLoad: 'حمل التبريد',
      status: 'الحالة',
      unitType: 'النوع',
      capacity: 'القدرة',
      temperature: 'درجة الحرارة',
      supply: 'الإمداد',
      return: 'العودة',
      setpoint: 'نقطة التعيين',
      airflow: 'تدفق الهواء',
      current: 'الحالي',
      maximum: 'الأقصى',
      power: 'الطاقة',
      consumption: 'الاستهلاك',
      lastMaintenance: 'آخر صيانة',
      nextMaintenance: 'الصيانة القادمة',
      alerts: 'التنبيهات',
      currentPUE: 'كفاءة الطاقة الحالية',
      targetPUE: 'كفاءة الطاقة المستهدفة',
      potentialSavings: 'التوفير المحتمل',
      energy: 'الطاقة',
      shortTerm: 'التوصيات قصيرة المدى',
      longTerm: 'التوصيات طويلة المدى',
      seasonalAdjustments: 'التعديلات الموسمية',
      summer: 'الصيف',
      winter: 'الشتاء',
      spring: 'الربيع',
      fall: 'الخريف',
      optimal: 'مثالي',
      warning: 'تحذير',
      critical: 'حرج',
      maintenance: 'صيانة',
      low: 'منخفض',
      medium: 'متوسط',
      high: 'عالي',
      per: 'لكل',
      day: 'يوم',
      month: 'شهر',
      year: 'سنة',
      kw: 'كيلوواط',
      kwh: 'كيلوواط ساعة',
      cfm: 'قدم مكعب/دقيقة',
      celsius: '°م',
      usd: 'دولار',
      kg: 'كج',
      co2: 'ثاني أكسيد الكربون'
    }
  };

  const t = translations[language];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#ff5252';
      case 'high': return '#ff9800';
      case 'medium': return '#ffc107';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ff5252';
      case 'warning': return '#ff9800';
      case 'optimal': return '#4caf50';
      case 'maintenance': return '#9c27b0';
      default: return '#2196f3';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderOverview = () => {
    if (!metrics) return null;

    return (
      <div className="advisor-overview">
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">🏭</div>
            <div className="metric-content">
              <h3>{metrics.totalCoolingCapacity.toFixed(1)} {t.kw}</h3>
              <p>{t.totalCapacity}</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <div className="metric-content">
              <h3>{metrics.currentCoolingLoad.toFixed(1)} {t.kw}</h3>
              <p>{t.currentLoad}</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">📊</div>
            <div className="metric-content">
              <h3>{metrics.strangedCapacity.toFixed(1)} {t.kw}</h3>
              <p>{t.strangedCapacity}</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">🎯</div>
            <div className="metric-content">
              <h3>{metrics.averageUtilization.toFixed(1)}%</h3>
              <p>{t.utilization}</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">⚙️</div>
            <div className="metric-content">
              <h3>{metrics.coolingEfficiency.toFixed(1)}%</h3>
              <p>{t.efficiency}</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">💡</div>
            <div className="metric-content">
              <h3>{metrics.energyConsumption.toFixed(1)} {t.kwh}</h3>
              <p>{t.energyConsumption} / {t.day}</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">🌱</div>
            <div className="metric-content">
              <h3>{metrics.carbonFootprint.toFixed(1)} {t.kg}</h3>
              <p>{t.carbonFootprint} {t.co2} / {t.day}</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">💰</div>
            <div className="metric-content">
              <h3>{formatCurrency(metrics.estimatedCost)}</h3>
              <p>{t.estimatedCost} / {t.day}</p>
            </div>
          </div>
        </div>

        <div className="risk-optimization-section">
          <div className="risk-level-card">
            <h3>{t.riskLevel}</h3>
            <div className={`risk-indicator ${metrics.riskLevel}`}>
              <span className="risk-value">{t[metrics.riskLevel]}</span>
            </div>
          </div>
          
          <div className="optimization-card">
            <h3>{t.optimizationPotential}</h3>
            <div className="optimization-meter">
              <div className="meter-bar">
                <div 
                  className="meter-fill"
                  style={{ width: `${metrics.optimizationPotential}%` }}
                />
              </div>
              <span className="meter-value">{metrics.optimizationPotential.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRecommendations = () => {
    return (
      <div className="recommendations-section">
        <div className="recommendations-list">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="recommendation-card">
              <div className="recommendation-header">
                <div className="recommendation-title">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(recommendation.priority) }}
                  >
                    {t[recommendation.priority]}
                  </span>
                  <h3>{recommendation.title}</h3>
                </div>
                <div className="recommendation-meta">
                  <span className="confidence">{t.confidence}: {recommendation.confidence.toFixed(1)}%</span>
                  <span className="type">{t[recommendation.type]}</span>
                </div>
              </div>
              
              <div className="recommendation-description">
                <p>{recommendation.description}</p>
              </div>
              
              <div className="recommendation-impact">
                <div className="impact-metric">
                  <span className="impact-label">{t.energySavings}</span>
                  <span className="impact-value">{recommendation.impact.energySavings.toFixed(1)} {t.kw}</span>
                </div>
                <div className="impact-metric">
                  <span className="impact-label">{t.costSavings}</span>
                  <span className="impact-value">{formatCurrency(recommendation.impact.costSavings)} / {t.month}</span>
                </div>
                <div className="impact-metric">
                  <span className="impact-label">{t.carbonReduction}</span>
                  <span className="impact-value">{recommendation.impact.carbonReduction.toFixed(0)} {t.kg} {t.co2} / {t.year}</span>
                </div>
                <div className="impact-metric">
                  <span className="impact-label">{t.riskReduction}</span>
                  <span className="impact-value">{recommendation.impact.riskReduction}%</span>
                </div>
              </div>
              
              <div className="recommendation-implementation">
                <div className="implementation-info">
                  <span className="effort">{t.effort}: {t[recommendation.implementation.effort]}</span>
                  <span className="timeframe">{t.timeframe}: {recommendation.implementation.timeframe}</span>
                  <span className="cost">{t.cost}: {formatCurrency(recommendation.implementation.cost)}</span>
                </div>
                
                <button 
                  className="details-button"
                  onClick={() => setSelectedRecommendation(recommendation)}
                >
                  {t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {selectedRecommendation && (
          <div className="recommendation-details-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedRecommendation.title}</h2>
                <button 
                  className="close-button"
                  onClick={() => setSelectedRecommendation(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="implementation-steps">
                  <h3>{t.steps}</h3>
                  <ol>
                    {selectedRecommendation.implementation.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="affected-equipment">
                  <h3>{t.affectedEquipment}</h3>
                  <ul>
                    {selectedRecommendation.affectedEquipment.map((equipment, index) => (
                      <li key={index}>{equipment}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="metrics-improvement">
                  <h3>Expected Improvement</h3>
                  <div className="metric-change">
                    <span>From: {selectedRecommendation.metrics.currentValue} {selectedRecommendation.metrics.unit}</span>
                    <span>To: {selectedRecommendation.metrics.targetValue} {selectedRecommendation.metrics.unit}</span>
                    <span className="improvement">({selectedRecommendation.metrics.improvement.toFixed(1)}% improvement)</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="close-button"
                  onClick={() => setSelectedRecommendation(null)}
                >
                  {t.closeDetails}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderThermalAnalysis = () => {
    return (
      <div className="thermal-analysis-section">
        <div className="thermal-zones">
          {thermalAnalysis.map((zone) => (
            <div key={zone.zone} className="thermal-zone-card">
              <div className="zone-header">
                <h3>{zone.zone}</h3>
                <span 
                  className="zone-status"
                  style={{ backgroundColor: getStatusColor(zone.status) }}
                >
                  {t[zone.status]}
                </span>
              </div>
              
              <div className="zone-location">
                <p>{zone.location}</p>
              </div>
              
              <div className="zone-metrics">
                <div className="metric-row">
                  <span className="metric-label">{t.currentTemp}</span>
                  <span className="metric-value">{zone.currentTemp.toFixed(1)} {t.celsius}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">{t.targetTemp}</span>
                  <span className="metric-value">{zone.targetTemp.toFixed(1)} {t.celsius}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">{t.deltaT}</span>
                  <span className="metric-value">{zone.deltaT.toFixed(1)} {t.celsius}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">{t.airflowRate}</span>
                  <span className="metric-value">{zone.airflowRate.toLocaleString()} {t.cfm}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">{t.coolingLoad}</span>
                  <span className="metric-value">{zone.coolingLoad.toFixed(1)} {t.kw}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">{t.efficiency}</span>
                  <span className="metric-value">{zone.efficiency.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="zone-recommendations">
                <h4>Recommendations:</h4>
                <ul>
                  {zone.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCoolingUnits = () => {
    return (
      <div className="cooling-units-section">
        <div className="units-grid">
          {coolingUnits.map((unit) => (
            <div key={unit.id} className="unit-card">
              <div className="unit-header">
                <h3>{unit.name}</h3>
                <div className="unit-meta">
                  <span className="unit-type">{unit.type}</span>
                  <span 
                    className="unit-status"
                    style={{ backgroundColor: getStatusColor(unit.status) }}
                  >
                    {t[unit.status]}
                  </span>
                </div>
              </div>
              
              <div className="unit-location">
                <p>{unit.location}</p>
              </div>
              
              <div className="unit-metrics">
                <div className="metric-section">
                  <h4>{t.capacity}</h4>
                  <div className="metric-row">
                    <span className="metric-label">{t.capacity}</span>
                    <span className="metric-value">{unit.capacity} {t.kw}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">{t.current} {t.currentLoad}</span>
                    <span className="metric-value">{unit.currentLoad} {t.kw}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">{t.utilization}</span>
                    <span className="metric-value">{unit.utilization.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="metric-section">
                  <h4>{t.temperature}</h4>
                  <div className="metric-row">
                    <span className="metric-label">{t.supply}</span>
                    <span className="metric-value">{unit.temperature.supply.toFixed(1)} {t.celsius}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">{t.return}</span>
                    <span className="metric-value">{unit.temperature.return.toFixed(1)} {t.celsius}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">{t.setpoint}</span>
                    <span className="metric-value">{unit.temperature.setpoint.toFixed(1)} {t.celsius}</span>
                  </div>
                </div>
                
                <div className="metric-section">
                  <h4>{t.airflow}</h4>
                  <div className="metric-row">
                    <span className="metric-label">{t.current}</span>
                    <span className="metric-value">{unit.airflow.current.toLocaleString()} {t.cfm}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">{t.maximum}</span>
                    <span className="metric-value">{unit.airflow.maximum.toLocaleString()} {t.cfm}</span>
                  </div>
                </div>
                
                <div className="metric-section">
                  <h4>{t.power}</h4>
                  <div className="metric-row">
                    <span className="metric-label">{t.consumption}</span>
                    <span className="metric-value">{unit.power.consumption.toFixed(1)} {t.kw}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">{t.efficiency}</span>
                    <span className="metric-value">{unit.power.efficiency.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="unit-maintenance">
                <div className="maintenance-info">
                  <div className="maintenance-item">
                    <span className="maintenance-label">{t.lastMaintenance}</span>
                    <span className="maintenance-value">{formatDate(unit.lastMaintenance)}</span>
                  </div>
                  <div className="maintenance-item">
                    <span className="maintenance-label">{t.nextMaintenance}</span>
                    <span className="maintenance-value">{formatDate(unit.nextMaintenance)}</span>
                  </div>
                </div>
              </div>
              
              {unit.alerts.length > 0 && (
                <div className="unit-alerts">
                  <h4>{t.alerts}</h4>
                  <ul>
                    {unit.alerts.map((alert, index) => (
                      <li key={index}>{alert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEnergyOptimization = () => {
    if (!energyOptimization) return null;

    return (
      <div className="energy-optimization-section">
        <div className="pue-section">
          <div className="pue-card">
            <h3>{t.currentPUE}</h3>
            <div className="pue-value">{energyOptimization.currentPUE.toFixed(2)}</div>
          </div>
          <div className="pue-card">
            <h3>{t.targetPUE}</h3>
            <div className="pue-value target">{energyOptimization.targetPUE.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="savings-section">
          <h3>{t.potentialSavings}</h3>
          <div className="savings-grid">
            <div className="savings-card">
              <div className="savings-icon">⚡</div>
              <div className="savings-content">
                <h4>{energyOptimization.potentialSavings.energy.toLocaleString()} {t.kwh}</h4>
                <p>{t.energy} / {t.year}</p>
              </div>
            </div>
            <div className="savings-card">
              <div className="savings-icon">💰</div>
              <div className="savings-content">
                <h4>{formatCurrency(energyOptimization.potentialSavings.cost)}</h4>
                <p>{t.cost} / {t.year}</p>
              </div>
            </div>
            <div className="savings-card">
              <div className="savings-icon">🌱</div>
              <div className="savings-content">
                <h4>{energyOptimization.potentialSavings.carbon.toLocaleString()} {t.kg}</h4>
                <p>{t.co2} / {t.year}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="recommendations-breakdown">
          <div className="recommendations-category">
            <h3>{t.shortTerm}</h3>
            <div className="recommendations-list">
              {energyOptimization.recommendations.shortTerm.map((rec) => (
                <div key={rec.id} className="recommendation-summary">
                  <span className="rec-title">{rec.title}</span>
                  <span className="rec-savings">{rec.impact.energySavings.toFixed(1)} {t.kw}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="recommendations-category">
            <h3>{t.longTerm}</h3>
            <div className="recommendations-list">
              {energyOptimization.recommendations.longTerm.map((rec) => (
                <div key={rec.id} className="recommendation-summary">
                  <span className="rec-title">{rec.title}</span>
                  <span className="rec-savings">{rec.impact.energySavings.toFixed(1)} {t.kw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="seasonal-adjustments">
          <h3>{t.seasonalAdjustments}</h3>
          <div className="seasonal-grid">
            <div className="seasonal-card">
              <h4>{t.summer}</h4>
              <p>{t.setpoint}: {energyOptimization.seasonalAdjustments.summer.setpoint} {t.celsius}</p>
              <p>{t.efficiency}: {energyOptimization.seasonalAdjustments.summer.efficiency}%</p>
            </div>
            <div className="seasonal-card">
              <h4>{t.winter}</h4>
              <p>{t.setpoint}: {energyOptimization.seasonalAdjustments.winter.setpoint} {t.celsius}</p>
              <p>{t.efficiency}: {energyOptimization.seasonalAdjustments.winter.efficiency}%</p>
            </div>
            <div className="seasonal-card">
              <h4>{t.spring}</h4>
              <p>{t.setpoint}: {energyOptimization.seasonalAdjustments.spring.setpoint} {t.celsius}</p>
              <p>{t.efficiency}: {energyOptimization.seasonalAdjustments.spring.efficiency}%</p>
            </div>
            <div className="seasonal-card">
              <h4>{t.fall}</h4>
              <p>{t.setpoint}: {energyOptimization.seasonalAdjustments.fall.setpoint} {t.celsius}</p>
              <p>{t.efficiency}: {energyOptimization.seasonalAdjustments.fall.efficiency}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`cooling-advisor ${isRTL ? 'rtl' : ''}`}>
      <div className="advisor-header">
        <Link to="/" className="back-btn">
          {t.backToMain}
        </Link>
        <div className="header-content">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </div>

      <div className="advisor-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {t.overview}
        </button>
        <button 
          className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          {t.recommendations}
        </button>
        <button 
          className={`tab-button ${activeTab === 'thermal' ? 'active' : ''}`}
          onClick={() => setActiveTab('thermal')}
        >
          {t.thermal}
        </button>
        <button 
          className={`tab-button ${activeTab === 'units' ? 'active' : ''}`}
          onClick={() => setActiveTab('units')}
        >
          {t.units}
        </button>
        <button 
          className={`tab-button ${activeTab === 'optimization' ? 'active' : ''}`}
          onClick={() => setActiveTab('optimization')}
        >
          {t.optimization}
        </button>
      </div>

      <div className="advisor-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'thermal' && renderThermalAnalysis()}
        {activeTab === 'units' && renderCoolingUnits()}
        {activeTab === 'optimization' && renderEnergyOptimization()}
      </div>
    </div>
  );
};

export default CoolingAdvisor; 