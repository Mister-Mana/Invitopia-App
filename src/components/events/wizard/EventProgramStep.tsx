import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Clock, Calendar } from 'lucide-react';

interface ProgramStep {
  id: string;
  time: string;
  title: string;
  description: string;
  duration: number; // in minutes
}

interface EventProgramStepProps {
  data: {
    program?: ProgramStep[];
  };
  onChange: (data: any) => void;
}

const EventProgramStep: React.FC<EventProgramStepProps> = ({ data, onChange }) => {
  const [program, setProgram] = useState<ProgramStep[]>(data.program || [
    {
      id: '1',
      time: '',
      title: '',
      description: '',
      duration: 30
    }
  ]);

  const addStep = () => {
    const newStep: ProgramStep = {
      id: Date.now().toString(),
      time: '',
      title: '',
      description: '',
      duration: 30
    };
    const updatedProgram = [...program, newStep];
    setProgram(updatedProgram);
    onChange({ program: updatedProgram });
  };

  const removeStep = (id: string) => {
    const updatedProgram = program.filter(step => step.id !== id);
    setProgram(updatedProgram);
    onChange({ program: updatedProgram });
  };

  const updateStep = (id: string, field: keyof ProgramStep, value: string | number) => {
    const updatedProgram = program.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    );
    setProgram(updatedProgram);
    onChange({ program: updatedProgram });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Programme de l'événement
          </CardTitle>
          <CardDescription>
            Créez un programme détaillé qui sera envoyé aux invités confirmés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {program.map((step, index) => (
            <Card key={step.id} className="border-2 border-muted">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-lg">
                      Étape {index + 1}
                    </h3>
                  </div>
                  {program.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStep(step.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`time-${step.id}`}>
                      Heure <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`time-${step.id}`}
                        type="time"
                        value={step.time}
                        onChange={(e) => updateStep(step.id, 'time', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`duration-${step.id}`}>
                      Durée (minutes) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id={`duration-${step.id}`}
                      type="number"
                      value={step.duration}
                      onChange={(e) => updateStep(step.id, 'duration', parseInt(e.target.value))}
                      min="1"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`title-${step.id}`}>
                      Titre de l'étape <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id={`title-${step.id}`}
                      value={step.title}
                      onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                      placeholder="Ex: Accueil des invités, Cérémonie, Cocktail..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`description-${step.id}`}>
                      Description (facultatif)
                    </Label>
                    <Textarea
                      id={`description-${step.id}`}
                      value={step.description}
                      onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                      placeholder="Détails supplémentaires sur cette étape..."
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addStep}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une étape
          </Button>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-1">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Information importante
              </h4>
              <p className="text-sm text-blue-700">
                Le programme sera automatiquement envoyé uniquement aux invités qui auront confirmé leur présence à l'événement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventProgramStep;
