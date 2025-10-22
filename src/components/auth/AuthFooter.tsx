
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthFooterProps {
  mode: 'signin' | 'signup';
}

const AuthFooter: React.FC<AuthFooterProps> = ({ mode }) => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center">
      {mode === 'signin' ? (
        <>
          <span className="text-sm text-invitopia-600">
            {t('auth.noAccount')} 
          </span>
          <Link to="/register" className="text-sm font-medium text-invitopia-700 hover:text-invitopia-800 ml-1">
            {t('auth.createAccount')}
          </Link>
        </>
      ) : (
        <>
          <span className="text-sm text-invitopia-600">
            {t('auth.haveAccount')} 
          </span>
          <Link to="/login" className="text-sm font-medium text-invitopia-700 hover:text-invitopia-800 ml-1">
            {t('auth.signIn')}
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthFooter;
