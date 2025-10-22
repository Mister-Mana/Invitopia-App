-- Create venues table for the venue management system
CREATE TABLE public.venues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 0,
  price NUMERIC NOT NULL DEFAULT 0,
  rating NUMERIC DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  description TEXT,
  contact_info JSONB DEFAULT '{}',
  availability JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

-- Create policies for venues
CREATE POLICY "Admins can manage all venues" 
ON public.venues 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Users can view active venues"
ON public.venues 
FOR SELECT 
USING (status = 'active');

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_venues_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION update_venues_updated_at();

-- Create venue_bookings table for booking management
CREATE TABLE public.venue_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID NOT NULL REFERENCES public.venues(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  organizer_id UUID NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_cost NUMERIC NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  booking_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for venue_bookings
ALTER TABLE public.venue_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for venue_bookings
CREATE POLICY "Users can manage their own bookings"
ON public.venue_bookings
FOR ALL
USING (organizer_id = auth.uid());

CREATE POLICY "Admins can manage all bookings"
ON public.venue_bookings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Create trigger for venue_bookings timestamp updates
CREATE TRIGGER update_venue_bookings_updated_at
  BEFORE UPDATE ON public.venue_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_venues_updated_at();

-- Insert sample venues data
INSERT INTO public.venues (name, location, capacity, price, rating, amenities, images, description, created_by) VALUES
(
  'Grand Ballroom Kinshasa',
  'Centre-ville, Kinshasa',
  500,
  2500,
  4.8,
  ARRAY['Climatisation', 'Parking', 'Sécurité', 'Cuisine'],
  ARRAY[
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=600&h=400&fit=crop'
  ],
  'Magnifique salle de réception avec vue panoramique sur la ville.',
  (SELECT id FROM profiles WHERE role = 'super_admin' LIMIT 1)
),
(
  'Jardin des Arts',
  'Gombe, Kinshasa',
  300,
  1800,
  4.6,
  ARRAY['Jardin', 'Éclairage LED', 'Bar', 'Terrasse'],
  ARRAY[
    'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=400&fit=crop'
  ],
  'Espace extérieur parfait pour les événements en plein air.',
  (SELECT id FROM profiles WHERE role = 'super_admin' LIMIT 1)
);