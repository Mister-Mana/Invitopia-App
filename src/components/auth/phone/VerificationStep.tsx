
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Check } from 'lucide-react';

interface VerificationStepProps {
  phone: string;
  code: string;
  setCode: (value: string) => void;
  codeError: string;
  onVerify: () => void;
  onGoBack: () => void;
  isLoading: boolean;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  phone,
  code,
  setCode,
  codeError,
  onVerify,
  onGoBack,
  isLoading
}) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-medium">{t('auth.enterVerificationCode')}</h3>
        <p className="text-sm text-invitopia-500">
          {t('auth.codeSentTo')} {phone}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-center my-6">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
        
        {codeError && <p className="text-red-500 text-sm text-center">{codeError}</p>}
        
        <Button
          type="button"
          className="w-full bg-invitopia-700 hover:bg-invitopia-600"
          onClick={onVerify}
          disabled={isLoading || code.length !== 6}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t('common.loading')}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Check className="h-4 w-4 mr-2" />
              {t('auth.verify')}
            </div>
          )}
        </Button>
        
        <div className="text-center">
          <Button 
            variant="link" 
            className="text-invitopia-600 hover:text-invitopia-800"
            onClick={onGoBack}
            disabled={isLoading}
          >
            {t('auth.useAnotherPhone')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VerificationStep;
