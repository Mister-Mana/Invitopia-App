import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, X, Mail, Phone, UserPlus } from 'lucide-react';
import { useContacts } from '@/hooks/useContacts';
import { Checkbox } from '@/components/ui/checkbox';

interface EventGuestsStepProps {
  data: any;
  onChange: (data: any) => void;
}

const EventGuestsStep: React.FC<EventGuestsStepProps> = ({ data, onChange }) => {
  const { contacts, loading: contactsLoading } = useContacts();
  const [newGuest, setNewGuest] = useState({ name: '', email: '', phone: '' });
  
  const handleCapacityChange = (value: string) => {
    const capacity = value ? parseInt(value) : undefined;
    onChange({ capacity });
  };

  const handleContactToggle = (contactId: string) => {
    const currentContacts = data.guestList?.contacts || [];
    const isSelected = currentContacts.includes(contactId);
    
    const updatedContacts = isSelected
      ? currentContacts.filter((id: string) => id !== contactId)
      : [...currentContacts, contactId];
    
    onChange({
      guestList: {
        ...data.guestList,
        contacts: updatedContacts
      }
    });
  };

  const handleAddCustomGuest = () => {
    if (!newGuest.name || !newGuest.email) return;
    
    const currentCustom = data.guestList?.customInvites || [];
    const updatedCustom = [...currentCustom, { ...newGuest }];
    
    onChange({
      guestList: {
        ...data.guestList,
        customInvites: updatedCustom
      }
    });
    
    setNewGuest({ name: '', email: '', phone: '' });
  };

  const handleRemoveCustomGuest = (index: number) => {
    const currentCustom = data.guestList?.customInvites || [];
    const updatedCustom = currentCustom.filter((_: any, i: number) => i !== index);
    
    onChange({
      guestList: {
        ...data.guestList,
        customInvites: updatedCustom
      }
    });
  };

  const selectedContacts = data.guestList?.contacts || [];
  const customInvites = data.guestList?.customInvites || [];
  const totalGuests = selectedContacts.length + customInvites.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Invités et capacité
        </h2>
        <p className="text-muted-foreground">
          Gérez vos invités et définissez la capacité de votre événement
        </p>
      </div>

      <div className="grid gap-6">
        {/* Capacité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2" />
              Capacité de l'événement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">
                Nombre maximum d'invités (optionnel)
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                placeholder="Ex: 100 (laissez vide pour illimité)"
                value={data.capacity || ''}
                onChange={(e) => handleCapacityChange(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Définissez une limite si votre lieu a une capacité maximale
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gestion des invités */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <UserPlus className="h-5 w-5 mr-2" />
              Invités ({totalGuests})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="contacts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contacts">Mes contacts</TabsTrigger>
                <TabsTrigger value="custom">Invitations personnalisées</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contacts" className="space-y-4">
                {contactsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : contacts.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                        <Checkbox
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={() => handleContactToggle(contact.id)}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">Aucun contact trouvé</h3>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez des contacts dans la section Contacts pour les inviter facilement
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-4">
                {/* Formulaire d'ajout */}
                <div className="grid gap-3 p-4 border rounded-lg bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="guestName">Nom</Label>
                      <Input
                        id="guestName"
                        placeholder="Nom complet"
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="guestEmail">Email</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        placeholder="email@exemple.com"
                        value={newGuest.email}
                        onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="guestPhone">Téléphone (optionnel)</Label>
                    <Input
                      id="guestPhone"
                      placeholder="+33 6 12 34 56 78"
                      value={newGuest.phone}
                      onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                    />
                  </div>
                  <Button
                    onClick={handleAddCustomGuest}
                    disabled={!newGuest.name || !newGuest.email}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter l'invité
                  </Button>
                </div>

                {/* Liste des invités personnalisés */}
                {customInvites.length > 0 && (
                  <div className="space-y-2">
                    <Label>Invités ajoutés ({customInvites.length})</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {customInvites.map((guest: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{guest.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {guest.email}
                              {guest.phone && (
                                <>
                                  <Phone className="h-3 w-3 ml-3 mr-1" />
                                  {guest.phone}
                                </>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCustomGuest(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Résumé */}
        {totalGuests > 0 && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Résumé des invités</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Contacts sélectionnés</div>
                  <div className="text-muted-foreground">{selectedContacts.length} personnes</div>
                </div>
                <div>
                  <div className="font-medium">Invitations personnalisées</div>
                  <div className="text-muted-foreground">{customInvites.length} personnes</div>
                </div>
                <div className="col-span-2 pt-2 border-t">
                  <div className="font-medium">Total des invités</div>
                  <div className="text-lg font-bold text-primary">
                    {totalGuests} invité{totalGuests > 1 ? 's' : ''}
                    {data.capacity && (
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        / {data.capacity} max
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventGuestsStep;