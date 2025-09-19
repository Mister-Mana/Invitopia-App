
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  
  const testimonialsByCategory = {
    all: [
      {
        name: "Marie Lukau",
        role: "Organisatrice d'événements",
        company: "ML Events",
        image: "/placeholder.svg",
        quote: "Invitopia a transformé la façon dont j'organise mes événements. L'interface est intuitive et les fonctionnalités sont exactement ce dont j'avais besoin. Je recommande vivement !",
        rating: 5,
        category: "business"
      },
      {
        name: "Jean-Paul Mabaya",
        role: "Chef d'entreprise",
        company: "JBM Consulting",
        image: "/placeholder.svg",
        quote: "Nous avons organisé notre conférence annuelle avec Invitopia et tout s'est parfaitement déroulé. Le suivi des invités était simple et les rappels automatiques ont augmenté notre taux de participation de 30%.",
        rating: 5,
        category: "business"
      },
      {
        name: "Sarah Nzuzi",
        role: "Jeune mariée",
        company: "",
        image: "/placeholder.svg",
        quote: "J'ai utilisé Invitopia pour notre mariage et c'était la meilleure décision ! Les invitations numériques étaient magnifiques et j'ai pu suivre toutes les réponses en temps réel. Un grand merci à l'équipe !",
        rating: 5,
        category: "wedding"
      },
      {
        name: "David Mukendi",
        role: "Responsable marketing",
        company: "TechCongo",
        image: "/placeholder.svg",
        quote: "La flexibilité d'Invitopia nous a permis d'adapter notre événement à nos besoins spécifiques. Le support client a toujours été réactif et professionnel.",
        rating: 4,
        category: "business"
      },
      {
        name: "Carine Lushima",
        role: "Responsable associative",
        company: "Association Kinshasa Solidaire",
        image: "/placeholder.svg",
        quote: "Pour notre gala de charité, nous avions besoin d'une solution fiable pour gérer les invitations et les dons. Invitopia a dépassé nos attentes à tous les niveaux.",
        rating: 5,
        category: "nonprofit"
      },
      {
        name: "Patrick Mbala",
        role: "Étudiant",
        company: "Université de Kinshasa",
        image: "/placeholder.svg",
        quote: "Nous avons organisé une remise des diplômes avec Invitopia. Le prix était très abordable pour notre budget étudiant et les fonctionnalités étaient impressionnantes !",
        rating: 4,
        category: "education"
      },
      {
        name: "François Kabila",
        role: "Jeune marié",
        company: "",
        image: "/placeholder.svg",
        quote: "Notre mariage traditionnel nécessitait beaucoup de coordination entre les familles. Invitopia nous a permis de tout centraliser et de communiquer efficacement avec tous les invités.",
        rating: 5,
        category: "wedding"
      },
      {
        name: "Nadine Mbombo",
        role: "Organisatrice de conférences",
        company: "CongoTech",
        image: "/placeholder.svg",
        quote: "La possibilité de créer des QR codes pour l'enregistrement des participants a vraiment simplifié notre processus d'accueil. L'application mobile est également très pratique.",
        rating: 4,
        category: "business"
      }
    ],
    business: [],
    wedding: [],
    nonprofit: [],
    education: []
  };
  
  // Remplir les catégories spécifiques
  testimonialsByCategory.business = testimonialsByCategory.all.filter(t => t.category === 'business');
  testimonialsByCategory.wedding = testimonialsByCategory.all.filter(t => t.category === 'wedding');
  testimonialsByCategory.nonprofit = testimonialsByCategory.all.filter(t => t.category === 'nonprofit');
  testimonialsByCategory.education = testimonialsByCategory.all.filter(t => t.category === 'education');

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  const renderTestimonials = (testimonials: typeof testimonialsByCategory.all) => {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-invitopia-500">
                    {testimonial.role} {testimonial.company && `• ${testimonial.company}`}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="flex-1 italic text-invitopia-600">
                "{testimonial.quote}"
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.testimonials.title')}</h1>
            <p className="text-invitopia-600 text-lg">
              {t('pages.testimonials.description')}
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-10">
            <TabsList className="mb-8 mx-auto flex justify-center">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="business">Entreprises</TabsTrigger>
              <TabsTrigger value="wedding">Mariages</TabsTrigger>
              <TabsTrigger value="nonprofit">Associations</TabsTrigger>
              <TabsTrigger value="education">Éducation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">{renderTestimonials(testimonialsByCategory.all)}</TabsContent>
            <TabsContent value="business">{renderTestimonials(testimonialsByCategory.business)}</TabsContent>
            <TabsContent value="wedding">{renderTestimonials(testimonialsByCategory.wedding)}</TabsContent>
            <TabsContent value="nonprofit">{renderTestimonials(testimonialsByCategory.nonprofit)}</TabsContent>
            <TabsContent value="education">{renderTestimonials(testimonialsByCategory.education)}</TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Testimonials;
