import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MapPin, Clock, Calendar } from 'lucide-react';

interface EventLocationStepProps {
  data: any;
  onChange: (data: any) => void;
}

const countries = [
  { code: 'FR', name: 'France' },
  { code: 'BE', name: 'Belgique' },
  { code: 'CH', name: 'Suisse' },
  { code: 'CA', name: 'Canada' },
  { code: 'US', name: 'États-Unis' },
  { code: 'GB', name: 'Royaume-Uni' },
  { code: 'DE', name: 'Allemagne' },
  { code: 'IT', name: 'Italie' },
  { code: 'ES', name: 'Espagne' }
];

const timezones = [
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Europe/London', label: 'Londres (GMT)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'America/New_York', label: 'New York (EST)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
  { value: 'America/Montreal', label: 'Montréal (EST)' }
];

const EventLocationStep: React.FC<EventLocationStepProps> = ({ data, onChange }) => {
  const handleLocationChange = (field: string, value: string) => {
    onChange({
      location: {
        ...data.location,
        [field]: value
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Lieu et date
        </h2>
        <p className="text-muted-foreground">
          Définissez quand et où aura lieu votre événement
        </p>
      </div>

      <div className="grid gap-6">
        {/* Lieu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              Lieu de l'événement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">
                Adresse <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                placeholder="Ex: 123 Rue de la Paix, Paris..."
                value={data.location?.address || ''}
                onChange={(e) => handleLocationChange('address', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  placeholder="Paris"
                  value={data.location?.city || ''}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Select
                  value={data.location?.country || 'FR'}
                  onValueChange={(value) => handleLocationChange('country', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Nom du lieu (optionnel)</Label>
              <Input
                id="venue"
                placeholder="Ex: Centre de conférence, Restaurant Le Jardin..."
                value={data.location?.venue || ''}
                onChange={(e) => handleLocationChange('venue', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Date et heure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Date et heure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Date de début <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={data.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">
                  Heure de début <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={data.time || ''}
                  onValueChange={(value) => handleInputChange('time', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin (optionnel)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={data.endDate || ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Heure de fin (optionnel)</Label>
                <Select
                  value={data.endTime || ''}
                  onValueChange={(value) => handleInputChange('endTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select
                value={data.timezone || 'Europe/Paris'}
                onValueChange={(value) => handleInputChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le fuseau horaire" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Aperçu */}
        {(data.location?.address || data.date) && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Aperçu</CardTitle>
            </CardHeader>
            <CardContent>
              {data.location?.address && (
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {data.location.venue && `${data.location.venue}, `}
                    {data.location.address}
                    {data.location.city && `, ${data.location.city}`}
                  </span>
                </div>
              )}
              {data.date && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(data.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {data.time && ` à ${data.time}`}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventLocationStep;