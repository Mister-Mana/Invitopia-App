
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-invitopia-50 border-t border-invitopia-100 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-invitopia-700 to-invitopia-500 mb-4">
              Invitopia
            </div>
            <p className="text-invitopia-600 text-sm">
              {t('home.footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-invitopia-800 mb-4">{t('home.footer.product')}</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.features')}</Link></li>
              <li><Link to="/pricing" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.pricing')}</Link></li>
              <li><Link to="/demo" className="text-sm text-invitopia-600 hover:text-invitopia-800">Démo</Link></li>
              <li><Link to="/testimonials" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.testimonials')}</Link></li>
              <li><Link to="/updates" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.updates')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-invitopia-800 mb-4">{t('home.footer.support')}</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.helpCenter')}</Link></li>
              <li><Link to="/contact" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.contact')}</Link></li>
              <li><Link to="/documentation" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.documentation')}</Link></li>
              <li><Link to="/status" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.status')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-invitopia-800 mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-invitopia-600 hover:text-invitopia-800">À propos</Link></li>
              <li><Link to="/team" className="text-sm text-invitopia-600 hover:text-invitopia-800">Équipe</Link></li>
              <li><Link to="/legal/terms" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.terms')}</Link></li>
              <li><Link to="/legal/privacy" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.privacy')}</Link></li>
              <li><Link to="/legal/cookies" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.cookies')}</Link></li>
              <li><Link to="/legal/compliance" className="text-sm text-invitopia-600 hover:text-invitopia-800">{t('home.footer.compliance')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-invitopia-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-invitopia-500">
            &copy; {new Date().getFullYear()} Invitopia. {t('home.footer.copyright')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-invitopia-500 hover:text-invitopia-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.829 9.829 0 01-2.828.775A4.928 4.928 0 0023.337 2.61a9.863 9.863 0 01-3.127 1.195A4.914 4.914 0 0016.616.248c-2.716 0-4.918 2.202-4.918 4.917 0 .39.044.765.126 1.124A13.97 13.97 0 011.67 1.776a4.928 4.928 0 00-.666 2.476c0 1.708.87 3.213 2.19 4.09a4.887 4.887 0 01-2.23-.616v.061c0 2.384 1.7 4.374 3.947 4.827a4.93 4.93 0 01-2.22.084 4.926 4.926 0 004.6 3.42 9.875 9.875 0 01-6.115 2.107c-.397 0-.79-.023-1.175-.069a13.92 13.92 0 007.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.214-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z"/></svg>
            </a>
            <a href="#" className="text-invitopia-500 hover:text-invitopia-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="text-invitopia-500 hover:text-invitopia-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
            </a>
            <a href="#" className="text-invitopia-500 hover:text-invitopia-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
