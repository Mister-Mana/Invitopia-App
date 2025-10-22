import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const PublicEventRedirect: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectToEvent = async () => {
      if (!eventId) {
        setError('ID d\'événement manquant');
        setLoading(false);
        return;
      }

      try {
        // Verify event exists and is public
        const { data: event, error: eventError } = await supabase
          .from('events')
          .select('id, title, visibility, status')
          .eq('id', eventId)
          .single();

        if (eventError) throw eventError;

        if (!event) {
          setError('Événement introuvable');
          setLoading(false);
          return;
        }

        if (event.visibility !== 'public' || event.status !== 'published') {
          setError('Cet événement n\'est pas accessible publiquement');
          setLoading(false);
          return;
        }

        // Redirect to public event page
        navigate(`/events/public/${eventId}`);
      } catch (err: any) {
        console.error('Error redirecting to event:', err);
        setError('Erreur lors de la redirection vers l\'événement');
        setLoading(false);
      }
    };

    redirectToEvent();
  }, [eventId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Redirection vers l'événement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PublicEventRedirect;
