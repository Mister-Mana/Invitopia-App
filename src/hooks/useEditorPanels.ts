
import { useState } from 'react';

export const useEditorPanels = () => {
  const [showElementsLibrary, setShowElementsLibrary] = useState(false);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [showFontSelector, setShowFontSelector] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTemplateSettings, setShowTemplateSettings] = useState(false);
  
  const togglePanel = (panel: string) => {
    switch (panel) {
      case 'elements':
        setShowElementsLibrary(!showElementsLibrary);
        break;
      case 'images':
        setShowImageLibrary(!showImageLibrary);
        break;
      case 'history':
        setShowHistoryPanel(!showHistoryPanel);
        break;
      case 'layers':
        setShowLayersPanel(!showLayersPanel);
        break;
      case 'fonts':
        setShowFontSelector(!showFontSelector);
        break;
      case 'colors':
        setShowColorPicker(!showColorPicker);
        break;
      case 'settings':
        setShowTemplateSettings(!showTemplateSettings);
        break;
      default:
        break;
    }
  };

  return {
    showElementsLibrary,
    showImageLibrary,
    showExportDialog,
    showHistoryPanel,
    showLayersPanel,
    showFontSelector,
    showColorPicker,
    showTemplateSettings,
    setShowElementsLibrary,
    setShowImageLibrary,
    setShowExportDialog,
    setShowHistoryPanel,
    setShowLayersPanel,
    setShowFontSelector,
    setShowColorPicker,
    setShowTemplateSettings,
    togglePanel
  };
};
