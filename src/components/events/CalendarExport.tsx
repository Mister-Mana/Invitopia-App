
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
    location: string;
    date: string;
    time?: string;
  };
}

const CalendarExport: React.FC<CalendarExportProps> = ({ event }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Format date/time for calendar
  const formatDate = (date: string, time?: string): string => {
    const eventDate = new Date(date);
    if (time) {
      const [hours, minutes] = time.split(':');
      eventDate.setHours(parseInt(hours), parseInt(minutes));
    }
    return eventDate.toISOString().replace(/-|:|\.\d+/g, '');
  };

  // Generate Google Calendar URL
  const generateGoogleCalendarUrl = () => {
    const startDate = formatDate(event.date, event.time);
    const endDate = formatDate(event.date, event.time ? 
      `${parseInt(event.time.split(':')[0]) + 1}:${event.time.split(':')[1]}` : 
      undefined);
      
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', event.title);
    url.searchParams.append('dates', `${startDate}/${endDate}`);
    if (event.description) url.searchParams.append('details', event.description);
    if (event.location) url.searchParams.append('location', event.location);
    
    return url.toString();
  };

  // Generate iCalendar file content
  const generateICalContent = () => {
    const startDate = formatDate(event.date, event.time);
    const endDate = formatDate(event.date, event.time ? 
      `${parseInt(event.time.split(':')[0]) + 1}:${event.time.split(':')[1]}` : 
      undefined);
      
    let content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `LOCATION:${event.location || ''}`,
      `DESCRIPTION:${event.description || ''}`,
      `UID:${event.id}@invitopia.com`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    
    return content;
  };

  // Download iCalendar file
  const downloadICalFile = () => {
    const fileContent = generateICalContent();
    const blob = new Blob([fileContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
    toast.success(t('events.calendar.downloadSuccess'));
  };

  // Open Google Calendar in new tab
  const openGoogleCalendar = () => {
    window.open(generateGoogleCalendarUrl(), '_blank');
    setIsOpen(false);
    toast.success(t('events.calendar.addedToGoogle'));
  };

  // For Apple Calendar - this actually also uses the iCal file
  const addToAppleCalendar = () => {
    downloadICalFile();
    toast.success(t('events.calendar.addedToApple'));
  };

  // For Outlook
  const addToOutlook = () => {
    downloadICalFile();
    toast.success(t('events.calendar.addedToOutlook'));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 mr-1" />
          {t('events.calendar.addToCalendar')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-4">
        <h3 className="font-medium mb-3">{t('events.calendar.chooseCalendar')}</h3>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={openGoogleCalendar}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Google Calendar
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-gray-800 hover:text-gray-900 hover:bg-gray-50"
            onClick={addToAppleCalendar}
          >
            <Apple className="h-4 w-4 mr-2" />
            Apple Calendar
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={addToOutlook}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Outlook
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={downloadICalFile}
          >
            <Download className="h-4 w-4 mr-2" />
            {t('events.calendar.downloadICS')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CalendarExport;
