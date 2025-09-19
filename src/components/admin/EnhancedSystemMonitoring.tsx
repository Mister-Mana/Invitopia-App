
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSystemMonitoring } from '@/hooks/useSystemMonitoring';
import { Activity, Server, Database, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EnhancedSystemMonitoring: React.FC = () => {
  const { metrics, loading, error, addMetric } = useSystemMonitoring();

  const simulateMetrics = async () => {
    const metricTypes = ['cpu', 'memory', 'disk', 'network'];
    const severities = ['info', 'warning', 'error'];
    
    for (let i = 0; i < 5; i++) {
      const metricType = metricTypes[Math.floor(Math.random() * metricTypes.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      
      await addMetric({
        metric_type: 'performance',
        metric_name: metricType,
        value: {
          percentage: Math.floor(Math.random() * 100),
          timestamp: new Date().toISOString()
        },
        severity,
        source: 'system_monitor'
      });
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      error: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return variants[severity as keyof typeof variants] || variants.info;
  };

  // Sample data for charts
  const chartData = metrics.slice(0, 20).reverse().map((metric, index) => ({
    name: `T${index + 1}`,
    value: typeof metric.value === 'object' && metric.value.percentage 
      ? metric.value.percentage 
      : Math.floor(Math.random() * 100),
    timestamp: metric.timestamp
  }));

  const recentErrors = metrics.filter(m => m.severity === 'error').slice(0, 5);
  const systemHealth = {
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    disk: Math.floor(Math.random() * 100),
    network: Math.floor(Math.random() * 100)
  };

  if (loading) return <div>Chargement des métriques...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CPU</p>
                <p className="text-2xl font-bold">{systemHealth.cpu}%</p>
              </div>
              <Server className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mémoire</p>
                <p className="text-2xl font-bold">{systemHealth.memory}%</p>
              </div>
              <Database className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disque</p>
                <p className="text-2xl font-bold">{systemHealth.disk}%</p>
              </div>
              <Database className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Réseau</p>
                <p className="text-2xl font-bold">{systemHealth.network}%</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance en temps réel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Errors */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Erreurs récentes</CardTitle>
          <Button onClick={simulateMetrics} variant="outline" size="sm">
            Simuler des métriques
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentErrors.map((error) => (
              <div key={error.id} className="border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(error.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{error.metric_name}</span>
                        <Badge className={getSeverityBadge(error.severity)}>
                          {error.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Source: {error.source}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(error.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">
                      {typeof error.value === 'object' 
                        ? JSON.stringify(error.value) 
                        : error.value
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {recentErrors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>Aucune erreur récente détectée</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Toutes les métriques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(metric.severity)}
                  <div>
                    <span className="font-medium">{metric.metric_name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({metric.metric_type})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityBadge(metric.severity)}>
                    {metric.severity}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(metric.timestamp).toLocaleTimeString('fr-FR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSystemMonitoring;
