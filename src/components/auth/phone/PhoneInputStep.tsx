
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, User, ArrowRight } from 'lucide-react';

interface PhoneInputStepProps {
  phone: string;
  setPhone: (value: string) => void;
  phoneError: string;
  name?: string;
  setName?: (value: string) => void;
  nameError?: string;
  isSignup: boolean;
  onSubmit: () => void;
  isLoading: boolean;
}

const PhoneInputStep: React.FC<PhoneInputStepProps> = ({
  phone,
  setPhone,
  phoneError,
  name,
  setName,
  nameError,
  isSignup,
  onSubmit,
  isLoading
}) => {
  const { t } = useLanguage();

  return (
    <>
      {isSignup && setName && (
        <div className="space-y-2">
          <Label htmlFor="name">{t('auth.name')}</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
            <Input
              id="name"
              type="text"
              placeholder={t('auth.namePlaceholder')}
              className={`pl-10 ${nameError ? 'border-red-500' : ''}`}
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="phone">{t('auth.phone')}</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
          <Input
            id="phone"
            type="tel"
            placeholder={t('auth.phonePlaceholder')}
            className={`pl-10 ${phoneError ? 'border-red-500' : ''}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
      </div>
      
      <Button
        type="button"
        className="w-full bg-invitopia-700 hover:bg-invitopia-600 mt-2"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {t('common.loading')}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <ArrowRight className="h-4 w-4 mr-2" />
            {t('auth.sendCode')}
          </div>
        )}
      </Button>
    </>
  );
};

export default PhoneInputStep;
