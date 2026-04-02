
-- Create deposit_status enum
CREATE TYPE public.deposit_status AS ENUM ('pending', 'approved', 'rejected');

-- Create deposits table
CREATE TABLE public.deposits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0,
  transaction_id TEXT,
  screenshot_url TEXT,
  status deposit_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

-- Users can insert their own deposits
CREATE POLICY "Users create own deposits"
ON public.deposits FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- Users can read their own deposits
CREATE POLICY "Users read own deposits"
ON public.deposits FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Admin can read all deposits
CREATE POLICY "Admin reads all deposits"
ON public.deposits FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update deposits (approve/reject)
CREATE POLICY "Admin updates deposits"
ON public.deposits FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_deposits_updated_at
BEFORE UPDATE ON public.deposits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Make deposits bucket public for reading
UPDATE storage.buckets SET public = true WHERE id = 'deposits';

-- Storage policies for deposits bucket
CREATE POLICY "Anyone can view deposit screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'deposits');

CREATE POLICY "Authenticated users can upload deposit screenshots"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'deposits');
