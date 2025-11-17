-- Add user_id column to customers table to link with authenticated users
ALTER TABLE public.customers 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for better performance when querying by user_id
CREATE INDEX idx_customers_user_id ON public.customers(user_id);

-- Update RLS policies to allow users to view their own records
CREATE POLICY "Users can view their own customer records" 
ON public.customers 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Keep the existing policy that allows anyone to insert
-- No changes needed to insert policy as we want both logged-in and anonymous submissions