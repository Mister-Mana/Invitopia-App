
import React from 'react';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContacts } from '@/hooks/useContacts';
import { useTeams } from '@/hooks/useTeams';

interface ContactSelectionFormProps {
  onSelectChange: (name: string, value: string) => void;
  selectedTeam?: string;
  selectedContactGroup?: string;
}

const ContactSelectionForm: React.FC<ContactSelectionFormProps> = ({ 
  onSelectChange, 
  selectedTeam,
  selectedContactGroup 
}) => {
  const { t } = useLanguage();
  const { contactGroups } = useContacts();
  const { teams } = useTeams();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="team">{t('createEvent.assignTeam')}</Label>
        <Select onValueChange={(value) => onSelectChange('team', value)} value={selectedTeam}>
          <SelectTrigger className="invitopia-input">
            <SelectValue placeholder={t('createEvent.chooseTeam')} />
          </SelectTrigger>
          <SelectContent>
            {teams.map(team => (
              <SelectItem key={team.id} value={team.id}>
                {team.name} ({team.members} membres)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!selectedTeam && (
          <p className="text-sm text-orange-600">{t('createEvent.teamRequired')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactGroup">{t('createEvent.selectContactGroup')}</Label>
        <Select onValueChange={(value) => onSelectChange('contactGroup', value)} value={selectedContactGroup}>
          <SelectTrigger className="invitopia-input">
            <SelectValue placeholder={t('createEvent.chooseContactGroup')} />
          </SelectTrigger>
          <SelectContent>
            {contactGroups.map(group => (
              <SelectItem key={group.id} value={group.id}>
                {group.name} ({group.count})
              </SelectItem>
            ))}
            <SelectItem value="all">{t('createEvent.allContacts')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ContactSelectionForm;
