
import React, { useState } from 'react';
import { Users, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface TableAssignmentProps {
  guestId: string;
  initialTableName?: string;
  className?: string;
}

const TableAssignment: React.FC<TableAssignmentProps> = ({ 
  guestId, 
  initialTableName = '', 
  className 
}) => {
  const { t } = useLanguage();
  const [editMode, setEditMode] = useState(false);
  const [tableName, setTableName] = useState(initialTableName);
  const [tempTableName, setTempTableName] = useState(initialTableName);

  const handleEdit = () => {
    setTempTableName(tableName);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    // In a real app, this would save to an API
    setTableName(tempTableName);
    setEditMode(false);
    toast.success("Assignation de table enregistrée !");
  };

  return (
    <div className={`bg-white rounded-xl border border-invitopia-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-invitopia-500" />
          <h3 className="text-lg font-semibold text-invitopia-800">Assignation de table</h3>
        </div>
        {!editMode && (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
        )}
      </div>

      {!editMode ? (
        <div>
          {tableName ? (
            <p className="text-invitopia-800">
              Table assignée : <span className="font-medium">{tableName}</span>
            </p>
          ) : (
            <p className="text-invitopia-500">
              Aucune table n'a été assignée à cet invité.
            </p>
          )}
          <p className="text-xs text-invitopia-500 mt-2">
            L'assignation de table sera visible par l'invité sur sa page d'invitation.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="tableName">Nom de la table</Label>
            <Input
              id="tableName"
              value={tempTableName}
              onChange={(e) => setTempTableName(e.target.value)}
              placeholder="Ex: Table Orchidée, Table 12, etc."
              className="mt-1"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" />
              Annuler
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Enregistrer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableAssignment;
