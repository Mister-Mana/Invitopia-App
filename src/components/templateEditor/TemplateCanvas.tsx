
import React from 'react';

interface TemplateCanvasProps {
  selectedColor: string;
  fontSize: number;
}

const TemplateCanvas: React.FC<TemplateCanvasProps> = ({ selectedColor, fontSize }) => {
  return (
    <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-invitopia-100 min-h-[70vh] flex items-center justify-center p-6 relative">
      <div 
        className="relative border rounded-lg overflow-hidden shadow-lg max-w-md w-full mx-auto"
        style={{ 
          fontFamily: 'Inter',
          backgroundColor: 'white',
        }}
      >
        <div className="aspect-[3/4] bg-gradient-to-br from-invitopia-100 to-invitopia-200 p-8 flex flex-col items-center justify-center text-center">
          <div 
            className="font-serif mb-6"
            style={{ 
              color: selectedColor,
              fontSize: `${fontSize + 16}px` 
            }}
          >
            Invitation
          </div>
          <div 
            className="font-bold mb-2" 
            style={{ 
              color: selectedColor,
              fontSize: `${fontSize + 8}px` 
            }}
          >
            Julie & Marc
          </div>
          <div 
            className="mb-6"
            style={{ fontSize: `${fontSize}px` }}
          >
            Ont le plaisir de vous convier à leur mariage
          </div>
          <div 
            className="font-medium"
            style={{ fontSize: `${fontSize}px` }}
          >
            Le 12 juin 2024
          </div>
          <div 
            className="mb-6"
            style={{ fontSize: `${fontSize}px` }}
          >
            à 15h00
          </div>
          <div 
            className="italic"
            style={{ fontSize: `${fontSize - 2}px` }}
          >
            Château de Versailles, Paris
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCanvas;
