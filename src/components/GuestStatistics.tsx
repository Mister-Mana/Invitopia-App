
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface GuestStatisticsProps {
  accepted: number;
  declined: number;
  pending: number;
  className?: string;
}

const GuestStatistics: React.FC<GuestStatisticsProps> = ({
  accepted,
  declined,
  pending,
  className
}) => {
  const data = [
    { name: 'Accepté', value: accepted, color: '#4ade80' },
    { name: 'Refusé', value: declined, color: '#f87171' },
    { name: 'En attente', value: pending, color: '#94a3b8' }
  ];

  const total = accepted + declined + pending;
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">État des invitations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-44 h-44 md:mr-6 mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={70}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} invités`, null]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex md:flex-col w-full justify-center space-y-0 space-x-4 md:space-y-3 md:space-x-0">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <span className="text-sm text-invitopia-600">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.value}</span>
                    <span className="text-xs text-invitopia-500">
                      ({Math.round((item.value / total) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestStatistics;
