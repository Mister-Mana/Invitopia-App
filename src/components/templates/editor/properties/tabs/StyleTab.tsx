
import React from 'react';
import { TextControls } from '../controls/TextControls';
import { ShapeControls } from '../controls/ShapeControls';
import { ImageControls } from '../controls/ImageControls';
import { CommonControls } from '../controls/CommonControls';

interface StyleTabProps {
  element: any;
  onUpdate: (properties: any) => void;
}

export const StyleTab: React.FC<StyleTabProps> = ({ element, onUpdate }) => {
  return (
    <div>
      {element.type === 'text' && (
        <TextControls element={element} onUpdate={onUpdate} />
      )}
      
      {element.type === 'shape' && (
        <ShapeControls element={element} onUpdate={onUpdate} />
      )}
      
      {element.type === 'image' && (
        <ImageControls element={element} onUpdate={onUpdate} />
      )}
      
      {/* Common controls for all element types */}
      <CommonControls element={element} onUpdate={onUpdate} />
    </div>
  );
};
