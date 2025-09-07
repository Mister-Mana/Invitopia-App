
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ImageLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

const ImageLibrary: React.FC<ImageLibraryProps> = ({ 
  isOpen, 
  onClose,
  onSelectImage
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample image collection
  const stockImages = [
    'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ];
  
  // User uploaded images (would be fetched from backend in real app)
  const userImages: string[] = [];
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('templates.editor.images')}</SheetTitle>
        </SheetHeader>
        
        <div className="relative mt-4 mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder={t('common.search')} 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="stock">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="stock" className="flex-1">{t('templates.editor.stockImages')}</TabsTrigger>
            <TabsTrigger value="uploaded" className="flex-1">{t('templates.editor.yourImages')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stock" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {stockImages.map((imageUrl, index) => (
                <div 
                  key={index}
                  className="aspect-square border rounded-md cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                  onClick={() => onSelectImage(imageUrl)}
                >
                  <img 
                    src={imageUrl} 
                    alt={`Stock image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="uploaded" className="mt-0">
            {userImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {userImages.map((imageUrl, index) => (
                  <div 
                    key={index}
                    className="aspect-square border rounded-md cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                    onClick={() => onSelectImage(imageUrl)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`User image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">{t('templates.editor.uploadImages')}</p>
                <Button>
                  {t('common.upload')}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default ImageLibrary;
