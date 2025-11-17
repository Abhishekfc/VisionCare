-- Create customers table
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  age int,
  gender text,
  left_eye_power text,
  right_eye_power text,
  lens_type text,
  notes text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can do everything with customers
CREATE POLICY "Admins can manage all customers"
ON public.customers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow public inserts (for customer form submission)
CREATE POLICY "Anyone can insert customers"
ON public.customers
FOR INSERT
TO anon
WITH CHECK (true);

-- Create expenses table
CREATE TABLE public.expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE,
  date date NOT NULL,
  description text,
  amount decimal(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on expenses
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can manage all expenses
CREATE POLICY "Admins can manage all expenses"
ON public.expenses
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_customers_created_at ON public.customers(created_at DESC);
CREATE INDEX idx_customers_name ON public.customers(name);
CREATE INDEX idx_expenses_customer_id ON public.expenses(customer_id);
CREATE INDEX idx_expenses_date ON public.expenses(date DESC);