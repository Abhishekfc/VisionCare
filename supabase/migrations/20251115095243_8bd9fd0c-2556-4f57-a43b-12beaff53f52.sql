-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add detailed eye prescription fields to customers table
ALTER TABLE public.customers
ADD COLUMN include_prescription boolean DEFAULT false,
ADD COLUMN right_sphere text,
ADD COLUMN right_cylinder text,
ADD COLUMN right_axis text,
ADD COLUMN right_add text,
ADD COLUMN right_pd_distance text,
ADD COLUMN left_sphere text,
ADD COLUMN left_cylinder text,
ADD COLUMN left_axis text,
ADD COLUMN left_add text,
ADD COLUMN left_pd_near text,
ADD COLUMN doctor_name text,
ADD COLUMN prescription_notes text;

-- Create consultation_requests table
CREATE TABLE public.consultation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on consultation_requests
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for consultation_requests
CREATE POLICY "Admins can manage all consultation requests"
ON public.consultation_requests
FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can insert consultation requests"
ON public.consultation_requests
FOR INSERT
WITH CHECK (true);

-- Create trigger for automatic timestamp updates on consultation_requests
CREATE TRIGGER update_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();