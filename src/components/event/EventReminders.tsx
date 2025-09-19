
import React, { useState } from 'react';
import { Calendar, Bell, Check, X, Clock, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventRemindersProps {
  eventId: string;
  eventDate: string;
  className?: string;
}

interface ReminderSettings {
  enabled: boolean;
  type: 'days' | 'hours';
  value: number;
  message: string;
}

const EventReminders: React.FC<EventRemindersProps> = ({ eventId, eventDate, className }) => {
  const { t } = useLanguage();
  const [editMode, setEditMode] = useState(false);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: true,
    type: 'days',
    value: 1,
    message: "N'oubliez pas l'événement à venir ! Nous avons hâte de vous voir."
  });

  const toggleReminders = (checked: boolean) => {
    setReminderSettings(prev => ({ ...prev, enabled: checked }));
  };

  const updateReminderType = (value: string) => {
    setReminderSettings(prev => ({ ...prev, type: value as 'days' | 'hours' }));
  };

  const updateReminderValue = (value: number[]) => {
    setReminderSettings(prev => ({ ...prev, value: value[0] }));
  };

  const updateReminderMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReminderSettings(prev => ({ ...prev, message: e.target.value }));
  };

  const saveSettings = () => {
    // In a real app, this would save to an API
    setEditMode(false);
    toast.success("Paramètres de rappel enregistrés !");
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  // Calculate when reminders will be sent
  const getReminderTime = () => {
    const eventTime = new Date(eventDate);
    if (reminderSettings.type === 'days') {
      const reminderTime = new Date(eventTime);
      reminderTime.setDate(reminderTime.getDate() - reminderSettings.value);
      return reminderTime.toLocaleDateString('fr-FR');
    } else {
      const reminderTime = new Date(eventTime);
      reminderTime.setHours(reminderTime.getHours() - reminderSettings.value);
      return `${reminderTime.toLocaleDateString('fr-FR')} à ${reminderTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-invitopia-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-invitopia-500" />
          <h3 className="text-lg font-semibold text-invitopia-800">Rappels d'événement</h3>
        </div>
        {!editMode && (
          <Button variant="ghost" size="sm" onClick={() => setEditMode(true)}>
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {!editMode ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-invitopia-600">Rappels activés</span>
              <span className="text-invitopia-800 font-medium">
                {reminderSettings.enabled ? 'Oui' : 'Non'}
              </span>
            </div>
            
            {reminderSettings.enabled && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-invitopia-600">Envoi du rappel</span>
                  <span className="text-invitopia-800 font-medium">
                    {reminderSettings.value} {reminderSettings.type === 'days' ? 
                      `jour${reminderSettings.value > 1 ? 's' : ''}` : 
                      `heure${reminderSettings.value > 1 ? 's' : ''}`} avant
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-invitopia-600">Date d'envoi prévue</span>
                  <span className="text-invitopia-800 font-medium">
                    {getReminderTime()}
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-invitopia-100">
                  <p className="text-invitopia-600 text-sm mb-1">Message de rappel :</p>
                  <p className="text-invitopia-800">{reminderSettings.message}</p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-invitopia-600">Activer les rappels</span>
              <Switch 
                checked={reminderSettings.enabled} 
                onCheckedChange={toggleReminders} 
              />
            </div>
            
            {reminderSettings.enabled && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <Select defaultValue={reminderSettings.type} onValueChange={updateReminderType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Jours</SelectItem>
                        <SelectItem value="hours">Heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="px-2">
                      <Slider 
                        defaultValue={[reminderSettings.value]} 
                        min={reminderSettings.type === 'days' ? 1 : 1} 
                        max={reminderSettings.type === 'days' ? 14 : 24} 
                        step={1}
                        onValueChange={updateReminderValue}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-invitopia-500 mt-1 px-2">
                      <span>
                        {reminderSettings.type === 'days' ? '1 jour' : '1 heure'}
                      </span>
                      <span>
                        {reminderSettings.type === 'days' ? '14 jours' : '24 heures'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-invitopia-600 text-sm mb-1">
                    Rappel {reminderSettings.value} {reminderSettings.type === 'days' ? 
                      `jour${reminderSettings.value > 1 ? 's' : ''}` : 
                      `heure${reminderSettings.value > 1 ? 's' : ''}`} avant l'événement
                  </p>
                  <p className="text-xs text-invitopia-500">
                    Sera envoyé le {getReminderTime()}
                  </p>
                </div>
                
                <div className="mt-2">
                  <p className="text-invitopia-600 text-sm mb-1">Message de rappel</p>
                  <Input 
                    value={reminderSettings.message} 
                    onChange={updateReminderMessage}
                    className="w-full" 
                  />
                </div>
              </>
            )}
            
            <div className="flex justify-end space-x-2 mt-4 pt-2">
              <Button variant="outline" size="sm" onClick={cancelEdit}>
                <X className="h-4 w-4 mr-1" />
                Annuler
              </Button>
              <Button size="sm" onClick={saveSettings}>
                <Check className="h-4 w-4 mr-1" />
                Enregistrer
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventReminders;
