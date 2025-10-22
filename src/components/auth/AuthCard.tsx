
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, description, children, footer }) => {
  return (
    <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-invitopia-800">
          {title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-invitopia-600">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6">
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className="flex flex-col space-y-4 pt-4 px-4 sm:px-6">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthCard;
