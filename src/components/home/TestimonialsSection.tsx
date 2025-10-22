
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection: React.FC = () => {
  const { tNested } = useLanguage();
  
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-invitopia-100 text-invitopia-700 mb-4 inline-block">
            {tNested('common.home.testimonials.label', 'Testimonials')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-invitopia-900 mb-4">
            {tNested('common.home.testimonials.title', 'What our users say')}
          </h2>
          <p className="text-invitopia-600">
            {tNested('common.home.testimonials.subtitle', 'Thousands of event organizers trust Invitopia for their events')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="bg-invitopia-50 rounded-xl p-6 border border-invitopia-100"
            >
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-invitopia-700 mb-6">
                {tNested(`common.home.testimonials.quotes.${item}`, `Testimonial quote ${item}`)}
              </blockquote>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-invitopia-200 flex items-center justify-center text-invitopia-700 font-medium mr-3">
                  {tNested(`common.home.testimonials.initials.${item}`, `--`)}
                </div>
                <div>
                  <p className="font-medium text-invitopia-800">
                    {tNested(`common.home.testimonials.names.${item}`, `Name ${item}`)}
                  </p>
                  <p className="text-sm text-invitopia-500">
                    {tNested(`common.home.testimonials.titles.${item}`, `Title ${item}`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
