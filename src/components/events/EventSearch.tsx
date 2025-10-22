import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventSearchProps {
  onSearch: (query: string, filters: EventSearchFilters) => void;
}

export interface EventSearchFilters {
  query: string;
  type: string;
  status: string;
  dateRange: string;
}

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<EventSearchFilters>({
    query: '',
    type: 'all',
    status: 'all',
    dateRange: 'all'
  });

  const handleSearch = () => {
    const searchFilters = { ...filters, query };
    onSearch(query, searchFilters);
  };

  const handleClearFilters = () => {
    setQuery('');
    setFilters({
      query: '',
      type: 'all',
      status: 'all',
      dateRange: 'all'
    });
    onSearch('', {
      query: '',
      type: 'all',
      status: 'all',
      dateRange: 'all'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('dashboard.events.searchPlaceholder') || 'Rechercher par titre, description ou type'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Rechercher
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Select 
          value={filters.type} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type d'événement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="wedding">Mariage</SelectItem>
            <SelectItem value="birthday">Anniversaire</SelectItem>
            <SelectItem value="corporate">Entreprise</SelectItem>
            <SelectItem value="conference">Conférence</SelectItem>
            <SelectItem value="concert">Concert</SelectItem>
            <SelectItem value="party">Fête</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.status} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="published">Publié</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.dateRange} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les dates</SelectItem>
            <SelectItem value="upcoming">À venir</SelectItem>
            <SelectItem value="past">Passés</SelectItem>
            <SelectItem value="this-week">Cette semaine</SelectItem>
            <SelectItem value="this-month">Ce mois-ci</SelectItem>
            <SelectItem value="this-year">Cette année</SelectItem>
          </SelectContent>
        </Select>

        {(query || filters.type !== 'all' || filters.status !== 'all' || filters.dateRange !== 'all') && (
          <Button variant="outline" onClick={handleClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
