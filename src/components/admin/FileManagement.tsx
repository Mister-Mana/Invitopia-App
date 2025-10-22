
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useFileUploads } from '@/hooks/useFileUploads';
import { FileText, Upload, Search, Trash2, Download, Eye, X, Image, FileVideo, FileAudio, Archive } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


const FileManagement: React.FC = () => {
  const { files, loading, error, uploadFile, deleteFile, getFileUrl } = useFileUploads();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter(file =>
    file.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.mime_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      try {
        await uploadFile(file, true); // Upload as public by default for admin
        toast.success(`Fichier "${file.name}" téléchargé avec succès`);
      } catch (error: any) {
        toast.error(`Erreur lors du téléchargement de "${file.name}": ${error.message}`);
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteFile = async (fileId: string, filename: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le fichier "${filename}" ?`)) {
      try {
        await deleteFile(fileId);
        toast.success('Fichier supprimé avec succès');
      } catch (error: any) {
        toast.error('Erreur lors de la suppression du fichier');
      }
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-5 w-5" />;
    if (mimeType.startsWith('video/')) return <FileVideo className="h-5 w-5" />;
    if (mimeType.startsWith('audio/')) return <FileAudio className="h-5 w-5" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const canPreview = (mimeType: string) => {
    return mimeType.startsWith('image/') || 
           mimeType === 'application/pdf' || 
           mimeType.startsWith('text/');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gestion des fichiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un fichier..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Télécharger des fichiers
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getFileIcon(file.mime_type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg truncate">{file.original_filename}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {file.mime_type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {formatBytes(file.file_size)}
                        </Badge>
                        <Badge variant={file.is_public ? 'default' : 'secondary'} className="text-xs">
                          {file.is_public ? 'Public' : 'Privé'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Téléchargé le {formatDate(file.created_at)}
                      </p>
                      {file.upload_source !== 'local' && (
                        <p className="text-xs text-blue-600">
                          Source: {file.upload_source}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {canPreview(file.mime_type) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSelectedFile(file);
                          setIsPreviewOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        const url = getFileUrl(file.storage_path);
                        window.open(url, '_blank');
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteFile(file.id, file.original_filename)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredFiles.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Aucun fichier trouvé' : 'Aucun fichier'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? 'Essayez de modifier votre recherche ou téléchargez de nouveaux fichiers.' 
                    : 'Commencez par télécharger des fichiers pour les gérer ici.'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Télécharger des fichiers
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedFile?.original_filename}</span>
              <Button variant="ghost" size="sm" onClick={() => setIsPreviewOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedFile && (
              <>
                {selectedFile.mime_type.startsWith('image/') && (
                  <img 
                    src={getFileUrl(selectedFile.storage_path)} 
                    alt={selectedFile.original_filename}
                    className="max-w-full max-h-[60vh] object-contain mx-auto"
                  />
                )}
                {selectedFile.mime_type === 'application/pdf' && (
                  <iframe 
                    src={getFileUrl(selectedFile.storage_path)}
                    className="w-full h-[60vh] border rounded"
                    title={selectedFile.original_filename}
                  />
                )}
                {selectedFile.mime_type.startsWith('text/') && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Aperçu du fichier texte:</p>
                    <iframe 
                      src={getFileUrl(selectedFile.storage_path)}
                      className="w-full h-[40vh] border rounded bg-white"
                      title={selectedFile.original_filename}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileManagement;
