import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Mail, MessageSquare, Clock, Users, CheckCircle } from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  label: string;
  icon: React.ReactNode;
  config: any;
}

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  onAddNode: (node: WorkflowNode) => void;
  onRemoveNode: (id: string) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ nodes, onAddNode, onRemoveNode }) => {
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  const nodeTypes = [
    { type: 'trigger', label: 'Événement créé', icon: <CheckCircle className="h-5 w-5" />, config: {} },
    { type: 'action', label: 'Envoyer email', icon: <Mail className="h-5 w-5" />, config: { subject: '', body: '' } },
    { type: 'action', label: 'Envoyer SMS', icon: <MessageSquare className="h-5 w-5" />, config: { message: '' } },
    { type: 'action', label: 'Délai', icon: <Clock className="h-5 w-5" />, config: { delay: 1, unit: 'hours' } },
    { type: 'condition', label: 'Si RSVP confirmé', icon: <Users className="h-5 w-5" />, config: {} }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Node Palette */}
      <Card className="p-4 lg:col-span-1">
        <h3 className="font-semibold mb-4">Composants disponibles</h3>
        <div className="space-y-2">
          {nodeTypes.map((nodeType, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start"
              onClick={() => onAddNode({
                id: `node-${Date.now()}`,
                type: nodeType.type as any,
                label: nodeType.label,
                icon: nodeType.icon,
                config: nodeType.config
              })}
            >
              {nodeType.icon}
              <span className="ml-2">{nodeType.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Canvas */}
      <div className="lg:col-span-3 border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[500px] bg-gray-50">
        {nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Plus className="h-12 w-12 mx-auto mb-4" />
              <p>Glissez des composants ici pour créer votre workflow</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {nodes.map((node, index) => (
              <div key={node.id} className="relative">
                <Card className="p-4 bg-white hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {node.icon}
                      <div>
                        <div className="font-medium">{node.label}</div>
                        <div className="text-xs text-gray-500">
                          {node.type === 'trigger' ? 'Déclencheur' : node.type === 'action' ? 'Action' : 'Condition'}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveNode(node.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </Card>
                {index < nodes.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowCanvas;
