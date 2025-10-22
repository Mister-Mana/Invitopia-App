
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.privacy.title')}</h1>
            <p className="text-invitopia-500">
              {t('pages.privacy.lastUpdated')}: 1 Mai 2023
            </p>
          </div>
          
          <div className="prose prose-invitopia max-w-none">
            <p>
              Chez Invitopia, nous accordons une grande importance à la protection de votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
            </p>
            
            <h2>1. Informations que nous collectons</h2>
            <p>
              Nous pouvons collecter plusieurs types d'informations auprès des utilisateurs de notre site web, notamment :
            </p>
            <ul>
              <li>
                <strong>Informations personnelles</strong> : Nom, adresse e-mail, numéro de téléphone, adresse postale, informations de paiement et autres informations que vous nous fournissez volontairement.
              </li>
              <li>
                <strong>Informations d'utilisation</strong> : Informations sur la façon dont vous accédez et utilisez notre site web et nos services, y compris les données sur le trafic, les journaux et autres données de communication.
              </li>
              <li>
                <strong>Informations sur l'appareil</strong> : Informations sur votre appareil, y compris l'adresse IP, le système d'exploitation, le type de navigateur et d'autres technologies sur les appareils que vous utilisez pour accéder à notre site web.
              </li>
            </ul>
            
            <h2>2. Comment nous utilisons vos informations</h2>
            <p>
              Nous pouvons utiliser les informations que nous collectons pour diverses finalités, notamment pour :
            </p>
            <ul>
              <li>Fournir, exploiter et maintenir notre site web et nos services.</li>
              <li>Améliorer, personnaliser et élargir notre site web et nos services.</li>
              <li>Comprendre et analyser comment vous utilisez notre site web et nos services.</li>
              <li>Développer de nouveaux produits, services, caractéristiques et fonctionnalités.</li>
              <li>Communiquer avec vous, soit directement, soit par l'intermédiaire de l'un de nos partenaires, y compris pour le service client, pour vous fournir des mises à jour et d'autres informations relatives au site web, et à des fins de marketing et de promotion.</li>
              <li>Vous envoyer des e-mails.</li>
              <li>Trouver et prévenir la fraude.</li>
            </ul>
            
            <h2>3. Partage de vos informations</h2>
            <p>
              Nous pouvons partager les informations que nous collectons dans diverses situations, notamment :
            </p>
            <ul>
              <li>
                <strong>Conformité légale</strong> : Nous pouvons divulguer vos informations lorsque nous sommes légalement tenus de le faire pour nous conformer à la loi applicable, aux demandes gouvernementales, à une procédure judiciaire, à une ordonnance du tribunal ou à un processus légal.
              </li>
              <li>
                <strong>Transferts d'entreprise</strong> : Nous pouvons partager ou transférer vos informations dans le cadre de, ou pendant les négociations de, toute fusion, vente d'actifs de l'entreprise, financement ou acquisition de tout ou partie de notre entreprise à une autre entreprise.
              </li>
              <li>
                <strong>Avec votre consentement</strong> : Nous pouvons divulguer vos informations personnelles à toute autre fin avec votre consentement.
              </li>
            </ul>
            
            <h2>4. Sécurité de vos informations</h2>
            <p>
              Nous utilisons des mesures de sécurité administratives, techniques et physiques pour protéger vos informations personnelles. Cependant, malgré nos garanties et nos efforts pour sécuriser vos informations, aucune transmission électronique sur Internet ou technologie de stockage d'informations ne peut être garantie à 100% sécurisée.
            </p>
            
            <h2>5. Vos droits en matière de confidentialité</h2>
            <p>
              Selon votre emplacement géographique, vous pouvez avoir certains droits concernant vos informations personnelles. Ces droits peuvent inclure le droit d'accéder à vos informations personnelles, de les corriger, de les supprimer, de limiter leur traitement, de les transférer, de s'opposer au traitement et de ne pas être soumis à une décision automatisée.
            </p>
            
            <h2>6. Cookies et technologies similaires</h2>
            <p>
              Nous pouvons utiliser des cookies et des technologies de suivi similaires pour collecter et stocker vos informations. Pour plus d'informations sur notre utilisation des cookies, veuillez consulter notre <a href="/cookies">Politique de cookies</a>.
            </p>
            
            <h2>7. Modifications de cette politique de confidentialité</h2>
            <p>
              Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date de "dernière mise à jour" en haut de cette politique de confidentialité.
            </p>
            
            <h2>8. Contactez-nous</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à <a href="mailto:privacy@invitopia.com">privacy@invitopia.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
