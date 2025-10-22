import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X, SwitchCamera, Scan } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface QRScannerProps {
  eventId: string;
  onScanSuccess: (guestId: string, guestData: any) => void;
  onClose: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ eventId, onScanSuccess, onClose }) => {
  const [scanning, setScanning] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [scanning, facingMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Start scanning for QR codes
        scanIntervalRef.current = setInterval(scanQRCode, 500);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Impossible d\'accéder à la caméra');
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const scanQRCode = async () => {
    if (!videoRef.current || !canvasRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = await detectQRCode(imageData);

      if (code) {
        await handleQRCodeDetected(code);
      }
    } catch (error) {
      // Silent fail for scanning errors
    }
  };

  const detectQRCode = async (imageData: ImageData): Promise<string | null> => {
    // Simple QR code detection using canvas
    // In production, you might want to use a library like jsQR
    try {
      // @ts-ignore - jsQR might not be typed
      if (window.jsQR) {
        // @ts-ignore
        const code = window.jsQR(imageData.data, imageData.width, imageData.height);
        return code ? code.data : null;
      }
    } catch (error) {
      console.error('QR detection error:', error);
    }
    return null;
  };

  const handleQRCodeDetected = async (qrData: string) => {
    stopCamera();
    setScanning(false);

    try {
      // Parse QR code data: EVENT:{eventId}|GUEST:{guestId}|{timestamp}
      const parts = qrData.split('|');
      if (parts.length < 2) {
        toast.error('QR code invalide');
        return;
      }

      const eventIdMatch = parts[0].match(/EVENT:(.+)/);
      const guestIdMatch = parts[1].match(/GUEST:(.+)/);

      if (!eventIdMatch || !guestIdMatch) {
        toast.error('QR code invalide');
        return;
      }

      const scannedEventId = eventIdMatch[1];
      const guestId = guestIdMatch[1];

      // Verify event ID matches
      if (scannedEventId !== eventId) {
        toast.error('Ce QR code ne correspond pas à cet événement');
        return;
      }

      // Fetch guest data
      const { data: guest, error } = await supabase
        .from('guests')
        .select('*')
        .eq('id', guestId)
        .eq('event_id', eventId)
        .single();

      if (error || !guest) {
        toast.error('Invité non trouvé');
        return;
      }

      // Check if already checked in
      if (guest.checked_in) {
        toast.info('Invité déjà enregistré');
        return;
      }

      // Update check-in status
      const { error: updateError } = await supabase
        .from('guests')
        .update({
          checked_in: true,
          check_in_time: new Date().toISOString()
        })
        .eq('id', guestId);

      if (updateError) throw updateError;

      onScanSuccess(guestId, guest);
      toast.success(`${guest.name} enregistré avec succès !`);
    } catch (error) {
      console.error('Error processing QR code:', error);
      toast.error('Erreur lors du traitement du QR code');
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Scanner le QR Code
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
          {scanning ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-primary rounded-lg animate-pulse" />
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={toggleCamera}
                  className="gap-2"
                >
                  <SwitchCamera className="h-4 w-4" />
                  Changer de caméra
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Button onClick={() => setScanning(true)} size="lg" className="gap-2">
                <Camera className="h-5 w-5" />
                Démarrer le scan
              </Button>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {scanning 
            ? 'Pointez la caméra vers le QR code de l\'invité' 
            : 'Appuyez pour démarrer le scanner'}
        </p>
      </CardContent>
    </Card>
  );
};