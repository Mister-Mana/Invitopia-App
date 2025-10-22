
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppearanceTabProps {
  onSelectChange: (name: string, value: string) => void;
  onImageUpload?: (file: File) => void;
  coverImageUrl?: string;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({
  onSelectChange,
  onImageUpload,
  coverImageUrl
}) => {
  const { t } = useLanguage();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-medium">Cover Image</Label>
        
        {coverImageUrl ? (
          <div className="relative">
            <img 
              src={coverImageUrl} 
              alt="Cover" 
              className="w-full h-48 object-cover rounded-lg border"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => document.getElementById('cover-upload')?.click()}
            >
              <Upload className="h-4 w-4 mr-1" />
              Change
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-invitopia-300 rounded-lg p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-invitopia-400 mb-4" />
            <p className="text-invitopia-600 mb-4">Upload a cover image for your event</p>
            <Button
              variant="outline"
              onClick={() => document.getElementById('cover-upload')?.click()}
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload Image
            </Button>
          </div>
        )}
        
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <div className="flex space-x-2">
            {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: color }}
                onClick={() => onSelectChange('primaryColor', color)}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Theme Style</Label>
          <div className="space-y-2">
            {['Modern', 'Classic', 'Elegant', 'Minimalist'].map(style => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="themeStyle"
                  value={style.toLowerCase()}
                  onChange={(e) => onSelectChange('themeStyle', e.target.value)}
                  className="text-invitopia-600"
                />
                <span className="text-sm">{style}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
