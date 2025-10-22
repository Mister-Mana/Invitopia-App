
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  ZoomIn, 
  ZoomOut, 
  Undo, 
  Redo,
  MousePointer,
  Type,
  Image as ImageIcon,
  Square,
  PanelLeft,
  PanelRight,
  Grid,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  MoveHorizontal,
  Maximize,
  LayoutGrid
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from '@/components/ui/switch';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';

interface EditorToolbarProps {
  editor: TemplateEditorHook;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  zoom: number;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  editor,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoom
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-between px-4 py-1 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={editor.state.mode === 'select' ? 'bg-gray-100' : ''}
                onClick={() => editor.setMode('select')}
              >
                <MousePointer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.selectTool')} (V)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={editor.state.mode === 'text' ? 'bg-gray-100' : ''}
                onClick={() => editor.setMode('text')}
              >
                <Type className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.text')} (T)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={editor.state.mode === 'image' ? 'bg-gray-100' : ''}
                onClick={() => editor.setMode('image')}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.images')} (I)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={editor.state.mode === 'shape' ? 'bg-gray-100' : ''}
                onClick={() => editor.setMode('shape')}
              >
                <Square className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.shapes')} (S)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={editor.state.mode === 'pan' ? 'bg-gray-100' : ''}
                onClick={() => editor.setMode('pan')}
              >
                <MoveHorizontal className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.panTool')} (H)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onUndo}
                disabled={editor.state.history.past.length === 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('common.undo')} (Ctrl+Z)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onRedo}
                disabled={editor.state.history.future.length === 0}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('common.redo')} (Ctrl+Y)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {editor.selectedElement && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => editor.duplicateElement(editor.selectedElement!.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('common.duplicate')} (Ctrl+D)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => editor.removeElement(editor.selectedElement!.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('common.delete')} (Del)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onZoomOut} disabled={zoom <= 0.1}>
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.zoomOut')} (-)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="space-x-1">
              <span className="text-xs whitespace-nowrap">{Math.round(zoom * 100)}%</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => editor.applyZoomPreset('fit')}>
              <Maximize className="h-4 w-4 mr-2" />
              <span>{t('templates.editor.fitToScreen')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.applyZoomPreset('50')}>50%</DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.applyZoomPreset('100')}>100%</DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.applyZoomPreset('150')}>150%</DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.applyZoomPreset('200')}>200%</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onZoomIn} disabled={zoom >= 5}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.zoomIn')} (+)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => editor.toggleGrid()}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center space-x-2 p-1">
                <p>{t('templates.editor.toggleGrid')}</p>
                <Switch 
                  checked={editor.state.showGrid} 
                  onCheckedChange={editor.toggleGrid} 
                />
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => editor.toggleSnapToGrid()}
                className={editor.state.snapToGrid ? 'bg-gray-100' : ''}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center space-x-2 p-1">
                <p>{t('templates.editor.snapToGrid')}</p>
                <Switch 
                  checked={editor.state.snapToGrid} 
                  onCheckedChange={editor.toggleSnapToGrid} 
                />
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.preview')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <PanelLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.toggleLeftPanel')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <PanelRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('templates.editor.toggleRightPanel')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default EditorToolbar;
