
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';

interface SettingsTabProps {
  onSelectChange: (name: string, value: string | boolean) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ onSelectChange }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customUrl">Custom Event URL</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              invitopia.com/events/
            </span>
            <Input
              id="customUrl"
              placeholder="my-event"
              onChange={(e) => onSelectChange('customUrl', e.target.value)}
              className="rounded-l-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Public Event</Label>
            <p className="text-sm text-gray-500">Make this event discoverable in public listings</p>
          </div>
          <Switch
            onCheckedChange={(checked) => onSelectChange('isPublic', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Send Reminders</Label>
            <p className="text-sm text-gray-500">Automatically send reminder notifications</p>
          </div>
          <Switch
            defaultChecked
            onCheckedChange={(checked) => onSelectChange('sendReminders', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Enable Check-in</Label>
            <p className="text-sm text-gray-500">Allow guests to check in at the event</p>
          </div>
          <Switch
            defaultChecked
            onCheckedChange={(checked) => onSelectChange('enableCheckIn', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
