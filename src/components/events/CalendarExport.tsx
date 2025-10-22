
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Download, Apple, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface CalendarExportProps {
  event: {
    id: string;
    title: string;
    description?: string;
    location?: any;
    start_date: string;
    end_date?: string;
  };
}

const CalendarExport: React.FC<CalendarExportProps> = ({ event }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Format date/time for calendar (iCalendar format: YYYYMMDDTHHMMSSZ)
  const formatDateForCalendar = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  // Get location string from event
  const getLocationString = (): string => {
    if (!event.location) return '';
    if (typeof event.location === 'string') return event.location;
    const loc = event.location;
    return [loc.address, loc.city, loc.country].filter(Boolean).join(', ');
  };

  // Generate Google Calendar URL
  const generateGoogleCalendarUrl = () => {
    const startDate = formatDateForCalendar(event.start_date);
    const endDate = event.end_date 
      ? formatDateForCalendar(event.end_date)
      : formatDateForCalendar(new Date(new Date(event.start_date).getTime() + 3600000).toISOString()); // +1 hour
      
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', event.title);
    url.searchParams.append('dates', `${startDate}/${endDate}`);
    if (event.description) url.searchParams.append('details', event.description);
    const location = getLocationString();
    if (location) url.searchParams.append('location', location);
    
    return url.toString();
  };

  // Generate iCalendar (.ics) file content
  const generateICalContent = () => {
    const startDate = formatDateForCalendar(event.start_date);
    const endDate = event.end_date 
      ? formatDateForCalendar(event.end_date)
      : formatDateForCalendar(new Date(new Date(event.start_date).getTime() + 3600000).toISOString());
    
    const location = getLocationString();
    const now = new Date().toISOString().replace(/-|:|\.\d+/g, '');
      
    let content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invitopia//Event Calendar//FR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.id}@invitopia.app`,
      `DTSTAMP:${now}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      event.description ? `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}` : '',
      location ? `LOCATION:${location}` : '',
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean).join('\r\n');
    
    return content;
  };

  // Download iCalendar file (.ics format - compatible with all major calendar apps)
  const downloadICalFile = (calendarType?: string) => {
    const fileContent = generateICalContent();
    const blob = new Blob([fileContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    setIsOpen(false);
    
    const message = calendarType 
      ? `Fichier téléchargé ! Ouvrez-le avec ${calendarType}.`
      : 'Fichier .ics téléchargé avec succès !';
    toast.success(message);
  };

  // Open Google Calendar in new tab
  const openGoogleCalendar = () => {
    window.open(generateGoogleCalendarUrl(), '_blank');
    setIsOpen(false);
    toast.success('Ouverture de Google Calendar...');
  };

  // For Apple Calendar
  const addToAppleCalendar = () => {
    downloadICalFile('Apple Calendar');
  };

  // For Outlook
  const addToOutlook = () => {
    downloadICalFile('Microsoft Outlook');
  };

  // For Yahoo Calendar
  const addToYahooCalendar = () => {
    const startDate = formatDateForCalendar(event.start_date);
    const endDate = event.end_date 
      ? formatDateForCalendar(event.end_date)
      : formatDateForCalendar(new Date(new Date(event.start_date).getTime() + 3600000).toISOString());
    
    const url = new URL('https://calendar.yahoo.com/');
    url.searchParams.append('v', '60');
    url.searchParams.append('title', event.title);
    url.searchParams.append('st', startDate);
    url.searchParams.append('et', endDate);
    if (event.description) url.searchParams.append('desc', event.description);
    const location = getLocationString();
    if (location) url.searchParams.append('in_loc', location);
    
    window.open(url.toString(), '_blank');
    setIsOpen(false);
    toast.success('Ouverture de Yahoo Calendar...');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 mr-1" />
          Exporter au calendrier
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <h3 className="font-medium mb-3 text-sm">Choisissez votre calendrier</h3>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm h-10 hover:bg-red-50 border-red-200"
            onClick={openGoogleCalendar}
          >
            <CalendarIcon className="h-4 w-4 mr-2 text-red-600" />
            <span className="text-foreground">Google Calendar</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm h-10 hover:bg-purple-50 border-purple-200"
            onClick={addToYahooCalendar}
          >
            <CalendarIcon className="h-4 w-4 mr-2 text-purple-600" />
            <span className="text-foreground">Yahoo Calendar</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm h-10 hover:bg-gray-50 border-gray-200"
            onClick={addToAppleCalendar}
          >
            <Apple className="h-4 w-4 mr-2 text-gray-700" />
            <span className="text-foreground">Apple Calendar</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-sm h-10 hover:bg-blue-50 border-blue-200"
            onClick={addToOutlook}
          >
            <Smartphone className="h-4 w-4 mr-2 text-blue-600" />
            <span className="text-foreground">Microsoft Outlook</span>
          </Button>
          
          <div className="pt-2 border-t mt-2">
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm h-10 hover:bg-green-50 border-green-200"
              onClick={() => downloadICalFile()}
            >
              <Download className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-foreground">Télécharger .ics</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2 px-1">
              Compatible avec tous les calendriers
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CalendarExport;
