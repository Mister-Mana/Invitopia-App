import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { toast } from 'sonner';

interface EventExportProps {
  eventId: string;
  eventTitle: string;
}

export const EventExport: React.FC<EventExportProps> = ({ eventId, eventTitle }) => {
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeGuests: true,
    includeResponses: true,
    includeCheckIns: true,
    includeStats: true
  });

  const exportAsJSON = async () => {
    setExporting(true);
    try {
      // Fetch event data
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (eventError) throw eventError;

      let exportData: any = { event };

      if (exportOptions.includeGuests) {
        const { data: guests, error: guestsError } = await supabase
          .from('guests')
          .select('*')
          .eq('event_id', eventId);

        if (guestsError) throw guestsError;
        exportData.guests = guests;
      }

      if (exportOptions.includeStats) {
        const { data: guests } = await supabase
          .from('guests')
          .select('rsvp_status, checked_in')
          .eq('event_id', eventId);

        exportData.statistics = {
          total: guests?.length || 0,
          confirmed: guests?.filter(g => g.rsvp_status === 'confirmed').length || 0,
          declined: guests?.filter(g => g.rsvp_status === 'declined').length || 0,
          pending: guests?.filter(g => g.rsvp_status === 'pending').length || 0,
          checkedIn: guests?.filter(g => g.checked_in).length || 0
        };
      }

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `${eventTitle.replace(/[^a-z0-9]/gi, '_')}_export_${new Date().toISOString().split('T')[0]}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast.success('Export JSON réussi');
      setOpen(false);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur lors de l\'export');
    } finally {
      setExporting(false);
    }
  };

  const exportAsCSV = async () => {
    setExporting(true);
    try {
      const { data: guests, error } = await supabase
        .from('guests')
        .select('*')
        .eq('event_id', eventId);

      if (error) throw error;

      if (!guests || guests.length === 0) {
        toast.error('Aucune donnée à exporter');
        return;
      }

      // Create CSV content
      const headers = ['Nom', 'Email', 'Téléphone', 'Statut RSVP', 'Enregistré', 'Date de réponse'];
      const rows = guests.map(g => [
        g.name,
        g.email || '',
        g.phone || '',
        g.rsvp_status,
        g.checked_in ? 'Oui' : 'Non',
        g.response_date ? new Date(g.response_date).toLocaleDateString('fr-FR') : ''
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const exportFileDefaultName = `${eventTitle.replace(/[^a-z0-9]/gi, '_')}_invites_${new Date().toISOString().split('T')[0]}.csv`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast.success('Export CSV réussi');
      setOpen(false);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur lors de l\'export');
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exporter l'événement</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Options */}
          <div className="space-y-3">
            <h4 className="font-medium">Options d'export</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="guests"
                  checked={exportOptions.includeGuests}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeGuests: !!checked })
                  }
                />
                <Label htmlFor="guests">Inclure les invités</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="responses"
                  checked={exportOptions.includeResponses}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeResponses: !!checked })
                  }
                />
                <Label htmlFor="responses">Inclure les réponses</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="checkins"
                  checked={exportOptions.includeCheckIns}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeCheckIns: !!checked })
                  }
                />
                <Label htmlFor="checkins">Inclure les enregistrements</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stats"
                  checked={exportOptions.includeStats}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeStats: !!checked })
                  }
                />
                <Label htmlFor="stats">Inclure les statistiques</Label>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="space-y-2">
            <h4 className="font-medium">Format d'export</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={exportAsCSV}
                disabled={exporting}
                className="flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                CSV (Invités)
              </Button>
              <Button
                variant="outline"
                onClick={exportAsJSON}
                disabled={exporting}
                className="flex items-center justify-center gap-2"
              >
                <FileJson className="h-4 w-4" />
                JSON (Complet)
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
