import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Invitopia - Plateforme de gestion d\'événements',
  description = 'Créez et gérez vos événements facilement avec Invitopia. Invitations digitales, gestion des invités, RSVP en ligne, et bien plus encore.',
  keywords = 'événements, invitations, gestion événements, RSVP, invitations digitales, organisateur événements, mariage, anniversaire, conférence',
  image = 'https://storage.googleapis.com/gpt-engineer-file-uploads/iysvVUXNLAPcj7we0GjLHeSHqnh2/social-images/social-1759365426550-1758722945633.jpg',
  url = 'https://invitopia.com',
  type = 'website',
  author = 'Invitopia'
}) => {
  const fullTitle = title.includes('Invitopia') ? title : `${title} | Invitopia`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary meta tags
    updateMetaTag('title', fullTitle);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'Invitopia', true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [fullTitle, description, keywords, image, url, type, author]);

  return null;
};

export default SEO;
