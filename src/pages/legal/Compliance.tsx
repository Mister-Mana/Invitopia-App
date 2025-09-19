
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const Compliance: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.compliance.title')}</h1>
            <p className="text-invitopia-600 text-lg">
              {t('pages.compliance.description')}
            </p>
          </div>
          
          <Tabs defaultValue="gdpr" className="mb-10">
            <TabsList className="mb-6">
              <TabsTrigger value="gdpr">GDPR</TabsTrigger>
              <TabsTrigger value="ccpa">CCPA</TabsTrigger>
              <TabsTrigger value="hipaa">HIPAA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gdpr" className="prose prose-invitopia max-w-none">
              <h2>Conformité au Règlement Général sur la Protection des Données (RGPD)</h2>
              <p>
                Le Règlement Général sur la Protection des Données (RGPD) est un règlement de l'Union européenne qui renforce et unifie la protection des données pour tous les individus au sein de l'Union européenne. Chez Invitopia, nous prenons nos obligations en vertu du RGPD très au sérieux et nous avons mis en place des mesures pour nous assurer que nous sommes conformes à ses exigences.
              </p>
              
              <h3>Comment nous nous conformons au RGPD</h3>
              <ul>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Base légale pour le traitement</strong> : Nous traitons les données personnelles uniquement lorsque nous avons une base légale valide, comme le consentement, l'exécution d'un contrat, une obligation légale ou nos intérêts légitimes.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Droits des personnes concernées</strong> : Nous respectons les droits des personnes concernées, y compris le droit d'accès, de rectification, d'effacement, de restriction du traitement, de portabilité des données et d'opposition au traitement.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Consentement explicite</strong> : Lorsque nous nous appuyons sur le consentement comme base pour le traitement, nous nous assurons que le consentement est donné librement, spécifique, informé et sans ambiguïté.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Protection des données dès la conception et par défaut</strong> : Nous intégrons des principes de protection des données dans nos produits et services dès les premières étapes de leur développement.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Transferts de données</strong> : Nous nous assurons que tous les transferts de données en dehors de l'EEE sont effectués en conformité avec les mécanismes de transfert approuvés par le RGPD.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Violation de données</strong> : Nous avons mis en place des procédures pour détecter, signaler et enquêter sur les violations de données personnelles conformément aux exigences du RGPD.
                  </span>
                </li>
              </ul>
              
              <h3>Vos droits en vertu du RGPD</h3>
              <p>
                En tant qu'utilisateur de nos services et résident de l'Union européenne, vous avez certains droits concernant vos données personnelles :
              </p>
              <ul>
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données personnelles</li>
                <li>Droit à l'effacement de vos données personnelles</li>
                <li>Droit à la limitation du traitement de vos données personnelles</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement de vos données personnelles</li>
                <li>Droit de ne pas être soumis à une décision automatisée, y compris le profilage</li>
              </ul>
              
              <p>
                Pour exercer l'un de ces droits, veuillez nous contacter à <a href="mailto:privacy@invitopia.com">privacy@invitopia.com</a>.
              </p>
            </TabsContent>
            
            <TabsContent value="ccpa" className="prose prose-invitopia max-w-none">
              <h2>Conformité à la California Consumer Privacy Act (CCPA)</h2>
              <p>
                La California Consumer Privacy Act (CCPA) donne aux résidents californiens de nouveaux droits concernant leurs informations personnelles et impose des responsabilités en matière de protection des données aux entreprises qui font des affaires en Californie. Chez Invitopia, nous nous engageons à respecter les droits à la vie privée de nos utilisateurs californiens.
              </p>
              
              <h3>Comment nous nous conformons au CCPA</h3>
              <ul>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Divulgation des pratiques de collecte</strong> : Nous divulguons de manière transparente les catégories d'informations personnelles que nous collectons, les sources de ces informations, les fins commerciales de la collecte et les tiers avec lesquels nous partageons ces informations.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Opt-out de la vente d'informations personnelles</strong> : Nous ne vendons pas vos informations personnelles et nous ne les vendrons pas sans vous en informer et vous donner la possibilité de vous désinscrire.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Droits d'accès et de suppression</strong> : Nous fournissons aux résidents californiens des moyens d'accéder à leurs informations personnelles, de demander la suppression de leurs informations, et d'exercer leurs droits CCPA sans discrimination.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Vérification de l'identité</strong> : Nous avons mis en place des procédures pour vérifier l'identité des personnes qui font des demandes relatives à leurs droits CCPA, afin de nous assurer que nous répondons à la bonne personne.
                  </span>
                </li>
              </ul>
              
              <h3>Vos droits en vertu du CCPA</h3>
              <p>
                En tant que résident de Californie, vous avez les droits suivants concernant vos informations personnelles :
              </p>
              <ul>
                <li>Droit de savoir quelles informations personnelles sont collectées, utilisées, partagées ou vendues</li>
                <li>Droit de supprimer les informations personnelles détenues par les entreprises et par extension de leurs fournisseurs de services</li>
                <li>Droit de se désinscrire de la vente de vos informations personnelles</li>
                <li>Droit à la non-discrimination dans les services et les prix lorsque vous exercez vos droits en matière de confidentialité</li>
              </ul>
              
              <p>
                Pour exercer l'un de ces droits, veuillez nous contacter à <a href="mailto:privacy@invitopia.com">privacy@invitopia.com</a>.
              </p>
            </TabsContent>
            
            <TabsContent value="hipaa" className="prose prose-invitopia max-w-none">
              <h2>Conformité à la Health Insurance Portability and Accountability Act (HIPAA)</h2>
              <p>
                Bien que Invitopia ne soit généralement pas considéré comme une entité couverte ou un associé commercial au sens de la HIPAA, nous reconnaissons l'importance de la protection des informations de santé protégées (PHI) et nous nous efforçons de mettre en œuvre des pratiques de sécurité rigoureuses pour toutes les données que nous traitons.
              </p>
              
              <h3>Notre approche de la conformité HIPAA</h3>
              <ul>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Protection des données de santé</strong> : Si nous traitons des informations qui pourraient être considérées comme des PHI dans le cadre de nos services, nous les traitons avec le plus haut niveau de sécurité et de confidentialité.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Mesures de sécurité</strong> : Nous utilisons des mesures de sécurité administratives, techniques et physiques pour protéger les données de nos utilisateurs, y compris le chiffrement, les contrôles d'accès et les audits de sécurité réguliers.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Formation des employés</strong> : Nos employés reçoivent une formation sur l'importance de la confidentialité des données et sur les procédures de sécurité pour prévenir les accès non autorisés.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Évaluation des risques</strong> : Nous effectuons régulièrement des évaluations des risques pour identifier et atténuer les risques potentiels pour la sécurité et la confidentialité des données.
                  </span>
                </li>
              </ul>
              
              <h3>Limitations concernant les informations de santé</h3>
              <p>
                Veuillez noter que Invitopia n'est pas conçu pour le stockage ou le traitement d'informations de santé sensibles qui seraient soumises à la HIPAA. Si vous êtes une entité couverte par la HIPAA et souhaitez utiliser nos services, veuillez nous contacter pour discuter de vos besoins spécifiques et déterminer si nos services peuvent répondre à vos exigences de conformité.
              </p>
              
              <p>
                Pour toute question concernant notre approche de la conformité HIPAA, veuillez nous contacter à <a href="mailto:compliance@invitopia.com">compliance@invitopia.com</a>.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Compliance;
