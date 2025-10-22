-- Add cover_image and gallery_images to venues if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'venues' 
                 AND column_name = 'cover_image') THEN
    ALTER TABLE public.venues ADD COLUMN cover_image TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'venues' 
                 AND column_name = 'gallery_images') THEN
    ALTER TABLE public.venues ADD COLUMN gallery_images TEXT[] DEFAULT '{}';
  END IF;
END $$;