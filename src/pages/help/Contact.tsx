
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t('pages.contact.form.fillAllFields') || 'Veuillez remplir tous les champs');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success(t('pages.contact.form.success') || 'Message envoyé avec succès!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error sending contact email:', error);
      toast.error(t('pages.contact.form.error') || 'Erreur lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.contact.title')}</h1>
            <p className="text-invitopia-600 text-lg">{t('pages.contact.description')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          {t('pages.contact.form.name')}
                        </label>
                        <Input 
                          id="name" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          {t('pages.contact.form.email')}
                        </label>
                        <Input 
                          id="email" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        {t('pages.contact.form.subject')}
                      </label>
                      <Input 
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        {t('pages.contact.form.message')}
                      </label>
                      <Textarea 
                        id="message" 
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? t('pages.contact.form.sending') || 'Envoi...' : t('pages.contact.form.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">{t('pages.contact.info.title')}</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-invitopia-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <a 
                          href="mailto:support@invitopia.com" 
                          className="text-invitopia-600 hover:text-invitopia-800"
                        >
                          {t('pages.contact.info.email')}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-invitopia-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium mb-1">Téléphone</p>
                        <a 
                          href="tel:+243123456789" 
                          className="text-invitopia-600 hover:text-invitopia-800"
                        >
                          {t('pages.contact.info.phone')}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-invitopia-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium mb-1">Adresse</p>
                        <p className="text-invitopia-600">
                          {t('pages.contact.info.address')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63457.60095103745!2d15.26873815896883!3d-4.325086431916632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3130fe066a8b%3A0x168b7e4e1f52378d!2sKinshasa%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2s!4v1715090384222!5m2!1sen!2s" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
