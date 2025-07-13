import React, { useState, useEffect } from 'react';
import { predictiveAnalytics } from '../data/predictive-analytics';
import type { PredictiveModel, EquipmentPrediction, MaintenanceSchedule, PerformanceMetrics, RiskAssessment, AIInsight } from '../data/predictive-analytics';

interface PredictiveAnalyticsProps {
  language: 'en' | 'ar';
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ language }) => {
  const isRTL = language === 'ar';
  const [models, setModels] = useState<PredictiveModel[]>([]);
  const [predictions, setPredictions] = useState<EquipmentPrediction[]>([]);
  const [schedule, setSchedule] = useState<MaintenanceSchedule[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [risks, setRisks] = useState<RiskAssessment[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'maintenance' | 'performance' | 'risks' | 'insights'>('overview');

  useEffect(() => {
    const loadData = () => {
      setModels(predictiveAnalytics.getModels());
      setPredictions(predictiveAnalytics.generatePredictions());
      setSchedule(predictiveAnalytics.generateMaintenanceSchedule());
      setMetrics(predictiveAnalytics.generatePerformanceMetrics());
      setRisks(predictiveAnalytics.generateRiskAssessments());
      setInsights(predictiveAnalytics.generateAIInsights());
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ff5252';
      case 'high': return '#ff9800';
      case 'medium': return '#ffc107';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderOverview = () => (
    <div className="analytics-overview">
      <div className="overview-stats">
        <div className="stat-card">
          <h3>{isRTL ? 'إجمالي المعدات' : 'Total Equipment'}</h3>
          <div className="stat-value">{predictions.length}</div>
          <div className="stat-label">{isRTL ? 'أنظمة مراقبة' : 'Monitored Systems'}</div>
        </div>
        <div className="stat-card">
          <h3>{isRTL ? 'مخاطر عالية' : 'High Risk'}</h3>
          <div className="stat-value critical">{predictions.filter(p => p.riskLevel === 'critical' || p.riskLevel === 'high').length}</div>
          <div className="stat-label">{isRTL ? 'تحتاج انتباه' : 'Need Attention'}</div>
        </div>
        <div className="stat-card">
          <h3>{isRTL ? 'الصيانة المجدولة' : 'Scheduled Maintenance'}</h3>
          <div className="stat-value">{schedule.length}</div>
          <div className="stat-label">{isRTL ? 'مهام مقبلة' : 'Upcoming Tasks'}</div>
        </div>
        <div className="stat-card">
          <h3>{isRTL ? 'الوفورات المتوقعة' : 'Potential Savings'}</h3>
          <div className="stat-value">{formatCurrency(insights.reduce((sum, insight) => sum + insight.potentialSavings, 0))}</div>
          <div className="stat-label">{isRTL ? 'من التحسينات' : 'From Optimization'}</div>
        </div>
      </div>

      <div className="ai-models-section">
        <h3>{isRTL ? 'أداء نماذج الذكاء الاصطناعي' : 'AI Model Performance'}</h3>
        <div className="models-grid">
          {models.map(model => (
            <div key={model.id} className="model-card">
              <div className="model-header">
                <h4>{model.name}</h4>
                <div className="model-type">{model.type.replace('_', ' ').toUpperCase()}</div>
              </div>
              <div className="model-metrics">
                <div className="metric">
                  <span className="metric-label">{isRTL ? 'الدقة' : 'Accuracy'}</span>
                  <span className="metric-value">{model.accuracy.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">{isRTL ? 'الثقة' : 'Confidence'}</span>
                  <span className="metric-value">{model.confidence.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">{isRTL ? 'نقاط البيانات' : 'Data Points'}</span>
                  <span className="metric-value">{model.dataPoints.toLocaleString()}</span>
                </div>
              </div>
              <div className="model-info">
                <div>{isRTL ? 'الإصدار' : 'Version'}: {model.version}</div>
                <div>{isRTL ? 'آخر تدريب' : 'Last Trained'}: {formatDate(model.lastTrained)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPredictions = () => (
    <div className="predictions-section">
      <h3>{isRTL ? 'تنبؤات فشل المعدات' : 'Equipment Failure Predictions'}</h3>
      <div className="predictions-grid">
        {predictions.map(prediction => (
          <div key={prediction.equipmentId} className="prediction-card">
            <div className="prediction-header">
              <h4>{prediction.equipmentName}</h4>
              <div className={`risk-badge ${prediction.riskLevel}`}>
                {prediction.riskLevel.toUpperCase()}
              </div>
            </div>
            
            <div className="prediction-metrics">
              <div className="failure-probability">
                <span className="label">{isRTL ? 'احتمال الفشل' : 'Failure Probability'}</span>
                <div className="probability-bar">
                  <div 
                    className="probability-fill" 
                    style={{ 
                      width: `${prediction.failureProbability * 100}%`,
                      backgroundColor: getStatusColor(prediction.riskLevel)
                    }}
                  />
                </div>
                <span className="probability-value">{(prediction.failureProbability * 100).toFixed(1)}%</span>
              </div>

              <div className="prediction-info">
                <div className="info-item">
                  <span className="label">{isRTL ? 'الوقت حتى الفشل' : 'Time to Failure'}</span>
                  <span className="value">{prediction.timeToFailure} {isRTL ? 'أيام' : 'days'}</span>
                </div>
                <div className="info-item">
                  <span className="label">{isRTL ? 'نوع الفشل المتوقع' : 'Predicted Failure Type'}</span>
                  <span className="value">{prediction.predictedFailureType}</span>
                </div>
                <div className="info-item">
                  <span className="label">{isRTL ? 'تأثير التكلفة' : 'Cost Impact'}</span>
                  <span className="value">{formatCurrency(prediction.costImpact)}</span>
                </div>
                <div className="info-item">
                  <span className="label">{isRTL ? 'نافذة الصيانة' : 'Maintenance Window'}</span>
                  <span className="value">{formatDate(prediction.maintenanceWindow)}</span>
                </div>
              </div>

              <div className="recommendations">
                <h5>{isRTL ? 'التوصيات' : 'Recommendations'}</h5>
                <ul>
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaintenance = () => (
    <div className="maintenance-section">
      <h3>{isRTL ? 'جدولة الصيانة' : 'Maintenance Schedule'}</h3>
      <div className="maintenance-table">
        <div className="table-header">
          <div className="column">{isRTL ? 'المعدات' : 'Equipment'}</div>
          <div className="column">{isRTL ? 'النوع' : 'Type'}</div>
          <div className="column">{isRTL ? 'الأولوية' : 'Priority'}</div>
          <div className="column">{isRTL ? 'التاريخ المجدول' : 'Scheduled Date'}</div>
          <div className="column">{isRTL ? 'المدة' : 'Duration'}</div>
          <div className="column">{isRTL ? 'التكلفة' : 'Cost'}</div>
          <div className="column">{isRTL ? 'الحالة' : 'Status'}</div>
        </div>
        {schedule.map(item => (
          <div key={item.id} className="table-row">
            <div className="column">{item.equipmentName}</div>
            <div className="column">
              <span className={`type-badge ${item.type}`}>
                {item.type.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="column">
              <span className={`priority-badge ${item.priority}`}>
                {item.priority.toUpperCase()}
              </span>
            </div>
            <div className="column">{formatDate(item.scheduledDate)}</div>
            <div className="column">{item.estimatedDuration}h</div>
            <div className="column">{formatCurrency(item.estimatedCost)}</div>
            <div className="column">
              <span className={`status-badge ${item.status}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="performance-section">
      <h3>{isRTL ? 'مقاييس الأداء' : 'Performance Metrics'}</h3>
      <div className="performance-grid">
        {metrics.map((metric, index) => {
          const equipment = predictions.find(p => p.equipmentId === metric.equipmentId);
          return (
            <div key={metric.equipmentId} className="performance-card">
              <h4>{equipment?.equipmentName}</h4>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'الكفاءة' : 'Efficiency'}</span>
                  <span className="metric-value">{metric.efficiency.toFixed(1)}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'الموثوقية' : 'Reliability'}</span>
                  <span className="metric-value">{metric.reliability.toFixed(1)}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'التوفر' : 'Availability'}</span>
                  <span className="metric-value">{metric.availability.toFixed(1)}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'الفعالية الإجمالية' : 'OEE'}</span>
                  <span className="metric-value">{metric.oee.toFixed(1)}%</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'تكلفة الصيانة' : 'Maintenance Cost'}</span>
                  <span className="metric-value">{formatCurrency(metric.maintenanceCost)}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'ساعات التوقف' : 'Downtime Hours'}</span>
                  <span className="metric-value">{metric.downtimeHours}h</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'متوسط الوقت بين الأعطال' : 'MTBF'}</span>
                  <span className="metric-value">{metric.mtbf}h</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">{isRTL ? 'متوسط وقت الإصلاح' : 'MTTR'}</span>
                  <span className="metric-value">{metric.mttr}h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderRisks = () => (
    <div className="risks-section">
      <h3>{isRTL ? 'تقييم المخاطر' : 'Risk Assessment'}</h3>
      <div className="risks-grid">
        {risks.map(risk => {
          const equipment = predictions.find(p => p.equipmentId === risk.equipmentId);
          return (
            <div key={risk.id} className="risk-card">
              <div className="risk-header">
                <h4>{equipment?.equipmentName}</h4>
                <div className={`impact-badge ${risk.impactLevel}`}>
                  {risk.impactLevel.toUpperCase()}
                </div>
              </div>
              <div className="risk-metrics">
                <div className="risk-score">
                  <span className="label">{isRTL ? 'نقاط المخاطر' : 'Risk Score'}</span>
                  <span className="value">{risk.riskScore.toFixed(1)}</span>
                </div>
                <div className="risk-details">
                  <div className="detail-item">
                    <span className="label">{isRTL ? 'الفئة' : 'Category'}</span>
                    <span className="value">{risk.riskCategory}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">{isRTL ? 'الاحتمالية' : 'Likelihood'}</span>
                    <span className="value">{risk.likelihood.toFixed(1)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">{isRTL ? 'العواقب' : 'Consequence'}</span>
                    <span className="value">{risk.consequence.toFixed(1)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">{isRTL ? 'المسؤول' : 'Owner'}</span>
                    <span className="value">{risk.owner}</span>
                  </div>
                </div>
                <div className="mitigation-actions">
                  <h5>{isRTL ? 'إجراءات التخفيف' : 'Mitigation Actions'}</h5>
                  <ul>
                    {risk.mitigationActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="insights-section">
      <h3>{isRTL ? 'رؤى الذكاء الاصطناعي' : 'AI Insights'}</h3>
      <div className="insights-grid">
        {insights.map(insight => (
          <div key={insight.id} className="insight-card">
            <div className="insight-header">
              <div className="insight-type">
                <span className={`type-badge ${insight.type}`}>
                  {insight.type.toUpperCase()}
                </span>
                <span className={`severity-badge ${insight.severity}`}>
                  {insight.severity.toUpperCase()}
                </span>
              </div>
              <div className="insight-confidence">
                {isRTL ? 'الثقة' : 'Confidence'}: {insight.confidence.toFixed(1)}%
              </div>
            </div>
            <h4>{insight.title}</h4>
            <p>{insight.description}</p>
            <div className="insight-metrics">
              <div className="metric">
                <span className="label">{isRTL ? 'الوفورات المحتملة' : 'Potential Savings'}</span>
                <span className="value">{formatCurrency(insight.potentialSavings)}</span>
              </div>
              <div className="metric">
                <span className="label">{isRTL ? 'الإطار الزمني' : 'Timeframe'}</span>
                <span className="value">{insight.timeframe}</span>
              </div>
            </div>
            <div className="recommended-actions">
              <h5>{isRTL ? 'الإجراءات الموصى بها' : 'Recommended Actions'}</h5>
              <ul>
                {insight.recommendedActions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
            <div className="insight-footer">
              <span>{isRTL ? 'تم إنشاؤها' : 'Generated'}: {formatDate(insight.generatedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`predictive-analytics ${isRTL ? 'rtl' : ''}`}>
      <div className="analytics-header">
        <h1>{isRTL ? 'التحليلات التنبؤية' : 'Predictive Analytics'}</h1>
        <div className="analytics-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {isRTL ? 'نظرة عامة' : 'Overview'}
          </button>
          <button 
            className={`tab-button ${activeTab === 'predictions' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictions')}
          >
            {isRTL ? 'التنبؤات' : 'Predictions'}
          </button>
          <button 
            className={`tab-button ${activeTab === 'maintenance' ? 'active' : ''}`}
            onClick={() => setActiveTab('maintenance')}
          >
            {isRTL ? 'الصيانة' : 'Maintenance'}
          </button>
          <button 
            className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            {isRTL ? 'الأداء' : 'Performance'}
          </button>
          <button 
            className={`tab-button ${activeTab === 'risks' ? 'active' : ''}`}
            onClick={() => setActiveTab('risks')}
          >
            {isRTL ? 'المخاطر' : 'Risks'}
          </button>
          <button 
            className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            {isRTL ? 'الرؤى' : 'Insights'}
          </button>
        </div>
      </div>

      <div className="analytics-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'predictions' && renderPredictions()}
        {activeTab === 'maintenance' && renderMaintenance()}
        {activeTab === 'performance' && renderPerformance()}
        {activeTab === 'risks' && renderRisks()}
        {activeTab === 'insights' && renderInsights()}
      </div>
    </div>
  );
};

export default PredictiveAnalytics; 