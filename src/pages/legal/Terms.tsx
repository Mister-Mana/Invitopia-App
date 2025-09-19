
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const Terms: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.terms.title')}</h1>
            <p className="text-invitopia-500">
              {t('pages.terms.lastUpdated')}: 1 Mai 2023
            </p>
          </div>
          
          <div className="prose prose-invitopia max-w-none">
            <p>
              Bienvenue sur Invitopia. En accédant à notre site web et à nos services, vous acceptez d'être lié par les présentes Conditions d'utilisation, notre Politique de confidentialité et toutes les conditions applicables ou règles qui sont publiées sur le site. Si vous n'acceptez pas toutes ces conditions, vous ne devez pas utiliser ou accéder à nos services.
            </p>
            
            <h2>1. Acceptation des conditions</h2>
            <p>
              En accédant à notre site web et en utilisant nos services, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas ces Conditions, vous ne devez pas accéder à notre site web ni utiliser nos services.
            </p>
            
            <h2>2. Modifications des conditions</h2>
            <p>
              Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant que les nouvelles conditions ne prennent effet. Ce qui constitue un changement important sera déterminé à notre seule discrétion.
            </p>
            
            <h2>3. Accès aux services</h2>
            <p>
              Nous nous réservons le droit de retirer ou de modifier nos services, et tout service ou matériel que nous fournissons sur notre site web, à notre seule discrétion et sans préavis. Nous ne serons pas responsables si, pour une raison quelconque, tout ou partie du site web est indisponible à tout moment ou pour toute période.
            </p>
            
            <h2>4. Propriété intellectuelle</h2>
            <p>
              Le service et tout le contenu, les fonctionnalités et les fonctionnalités associées sont et resteront la propriété exclusive d'Invitopia et de ses concédants de licence. Le service est protégé par le droit d'auteur, le droit des marques et d'autres lois.
            </p>
            
            <h2>5. Comptes utilisateurs</h2>
            <p>
              Lorsque vous créez un compte chez nous, vous êtes responsable de maintenir la sécurité de votre compte et vous êtes entièrement responsable de toutes les activités qui se produisent sous le compte et de toute autre action entreprise dans le cadre du compte.
            </p>
            
            <h2>6. Contenu utilisateur</h2>
            <p>
              Notre service vous permet de publier, de lier, de stocker, de partager et de mettre à disposition certaines informations, textes, graphiques, vidéos ou autres documents. Vous êtes responsable de tout contenu que vous publiez sur notre service.
            </p>
            
            <h2>7. Liens vers d'autres sites web</h2>
            <p>
              Notre service peut contenir des liens vers des sites web ou services tiers qui ne sont pas détenus ou contrôlés par Invitopia. Nous n'avons aucun contrôle sur et n'assumons aucune responsabilité pour le contenu, les politiques de confidentialité ou les pratiques de tout site web ou service tiers.
            </p>
            
            <h2>8. Résiliation</h2>
            <p>
              Nous pouvons résilier ou suspendre votre compte immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris sans limitation si vous violez les Conditions.
            </p>
            
            <h2>9. Limitation de responsabilité</h2>
            <p>
              En aucun cas, Invitopia, ses administrateurs, employés, partenaires, agents, fournisseurs ou affiliés ne seront responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris, sans limitation, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes intangibles.
            </p>
            
            <h2>10. Loi applicable</h2>
            <p>
              Ces Conditions sont régies et interprétées conformément aux lois de la République Démocratique du Congo, sans égard aux dispositions en matière de conflit de lois.
            </p>
            
            <h2>11. Contactez-nous</h2>
            <p>
              Si vous avez des questions concernant ces Conditions, veuillez nous contacter à <a href="mailto:legal@invitopia.com">legal@invitopia.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
