
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface FontSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFont: (fontFamily: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ 
  isOpen, 
  onClose,
  onSelectFont
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [category, setCategory] = React.useState('all');
  
  // Sample font list
  const fonts = [
    { name: 'Inter', category: 'sans-serif' },
    { name: 'Roboto', category: 'sans-serif' },
    { name: 'Montserrat', category: 'sans-serif' },
    { name: 'Poppins', category: 'sans-serif' },
    { name: 'Open Sans', category: 'sans-serif' },
    { name: 'Playfair Display', category: 'serif' },
    { name: 'Merriweather', category: 'serif' },
    { name: 'Lora', category: 'serif' },
    { name: 'Fira Code', category: 'monospace' },
    { name: 'Courier New', category: 'monospace' }
  ];
  
  const filteredFonts = fonts.filter(font => 
    (category === 'all' || font.category === category) &&
    (searchQuery === '' || font.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('templates.editor.fonts')}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-4 space-y-4">
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder={t('common.categories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="sans-serif">Sans Serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="monospace">Monospace</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder={t('common.search')} 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 pt-2">
            {filteredFonts.map((font) => (
              <div 
                key={font.name}
                className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onSelectFont(font.name)}
              >
                <div className="text-sm text-gray-500 mb-1">{font.name}</div>
                <div style={{ fontFamily: font.name }}>
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FontSelector;
