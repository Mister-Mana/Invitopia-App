
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingFeature {
  title: string;
  value: boolean | string;
  tooltip?: string;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  priceFC: string;
  billingCycle: 'monthly' | 'yearly';
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isRecommended?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  price,
  priceFC,
  billingCycle,
  features,
  buttonText,
  buttonLink,
  isRecommended = false
}) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <span className="text-gray-300">—</span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <Card className={cn(
      "shadow-sm hover:shadow-md transition-shadow",
      isRecommended ? "border-invitopia-500 shadow-lg relative" : "border-invitopia-100"
    )}>
      {isRecommended && (
        <>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-invitopia-500 to-invitopia-400 rounded-t-lg"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-invitopia-700 text-white text-xs font-semibold py-1 px-3 rounded-full">
            Recommandé
          </div>
        </>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold text-invitopia-900">
            {price}
          </span>
          <span className="text-invitopia-500 ml-1">
            /{billingCycle === 'monthly' ? 'mois' : 'an'}
          </span>
          <div className="text-lg font-semibold text-invitopia-700 mt-1">
            {priceFC}/{billingCycle === 'monthly' ? 'mois' : 'an'}
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[340px] overflow-y-auto">
        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <div className="w-6 mr-2 text-center">
                {renderFeatureValue(feature.value)}
              </div>
              <span className="text-invitopia-700 flex-1">
                {feature.title}
                {feature.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 inline-block ml-1 text-invitopia-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60">{feature.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={cn(
            "w-full",
            isRecommended
              ? "bg-invitopia-700 hover:bg-invitopia-600 text-white"
              : "bg-white border border-invitopia-300 text-invitopia-700 hover:bg-invitopia-50"
          )}
          asChild
        >
          <Link to={buttonLink}>
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
