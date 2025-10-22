
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { PhoneInputStep, VerificationStep, validatePhone, validateName } from './phone';

interface PhoneAuthProps {
  mode: 'signin' | 'signup';
  onSuccess: () => void;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({ mode, onSuccess }) => {
  const { t } = useLanguage();
  const { sendPhoneVerification, loginWithPhone, signupWithPhone, isLoading } = useAuth();
  
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [codeError, setCodeError] = useState('');
  
  const validateAndClearErrors = () => {
    let isValid = true;
    
    if (!validatePhone(phone)) {
      setPhoneError(phone.trim() ? t('auth.invalidPhone') : t('auth.phoneRequired'));
      isValid = false;
    } else {
      setPhoneError('');
    }
    
    if (!validateName(name, mode === 'signup')) {
      setNameError(t('auth.nameRequired'));
      isValid = false;
    } else {
      setNameError('');
    }
    
    return isValid;
  };
  
  const handleSendCode = async () => {
    if (!validateAndClearErrors()) return;
    
    try {
      if (mode === 'signup') {
        await signupWithPhone(name, phone);
      } else {
        await sendPhoneVerification(phone);
      }
      
      setStep('verification');
      toast.success(t('auth.codeSent'));
    } catch (error: any) {
      toast.error(error.message || t('auth.sendCodeFailed'));
    }
  };
  
  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setCodeError(t('auth.invalidCode'));
      return;
    }
    
    try {
      await loginWithPhone(phone, code);
      toast.success(t('auth.loginSuccess'));
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || t('auth.verificationFailed'));
    }
  };
  
  return (
    <div className="space-y-4">
      {step === 'phone' ? (
        <PhoneInputStep
          phone={phone}
          setPhone={setPhone}
          phoneError={phoneError}
          name={name}
          setName={setName}
          nameError={nameError}
          isSignup={mode === 'signup'}
          onSubmit={handleSendCode}
          isLoading={isLoading}
        />
      ) : (
        <VerificationStep
          phone={phone}
          code={code}
          setCode={(value) => {
            setCode(value);
            setCodeError('');
          }}
          codeError={codeError}
          onVerify={handleVerifyCode}
          onGoBack={() => setStep('phone')}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default PhoneAuth;
