
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { LucideIcon } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  description,
  icon: Icon
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Icon className="h-5 w-5 mr-2 text-invitopia-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-invitopia-900">{value}</div>
        <p className="text-invitopia-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
