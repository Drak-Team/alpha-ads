
-- Enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Enum for withdrawal status
CREATE TYPE public.withdrawal_status AS ENUM ('pending', 'approved', 'rejected');

-- User roles table (never on profiles!)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT,
  display_name TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES auth.users(id),
  balance INTEGER NOT NULL DEFAULT 0,
  total_earned INTEGER NOT NULL DEFAULT 0,
  referral_earnings INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Plans table
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL DEFAULT 0,
  daily_earning INTEGER NOT NULL DEFAULT 0,
  daily_ads INTEGER NOT NULL DEFAULT 6,
  duration_days INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.plans(id) NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Daily ad watches
CREATE TABLE public.ad_watches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  watched_date DATE NOT NULL DEFAULT CURRENT_DATE,
  ads_completed INTEGER NOT NULL DEFAULT 0,
  all_completed BOOLEAN NOT NULL DEFAULT false,
  earning_claimed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, watched_date)
);
ALTER TABLE public.ad_watches ENABLE ROW LEVEL SECURITY;

-- Withdrawals
CREATE TABLE public.withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  fee INTEGER NOT NULL DEFAULT 0,
  payout INTEGER NOT NULL DEFAULT 0,
  method TEXT NOT NULL DEFAULT 'jazzcash',
  account_number TEXT NOT NULL,
  status withdrawal_status NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ
);
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

-- Referrals tracking
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bonus_amount INTEGER NOT NULL DEFAULT 0,
  bonus_credited BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (referred_id)
);
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Transactions / activity log
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- ==================== RLS POLICIES ====================

-- User roles: only admin reads all, users read own
CREATE POLICY "Users read own role" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admin reads all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Admin reads all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (id = auth.uid());

-- Plans: readable by all authenticated
CREATE POLICY "Anyone reads plans" ON public.plans
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin manages plans" ON public.plans
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Subscriptions
CREATE POLICY "Users read own subs" ON public.subscriptions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admin reads all subs" ON public.subscriptions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users create own sub" ON public.subscriptions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own sub" ON public.subscriptions
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Ad watches
CREATE POLICY "Users read own watches" ON public.ad_watches
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users insert own watches" ON public.ad_watches
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own watches" ON public.ad_watches
  FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admin reads all watches" ON public.ad_watches
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Withdrawals
CREATE POLICY "Users read own withdrawals" ON public.withdrawals
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users create withdrawal" ON public.withdrawals
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admin reads all withdrawals" ON public.withdrawals
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin updates withdrawals" ON public.withdrawals
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Referrals
CREATE POLICY "Users read own referrals" ON public.referrals
  FOR SELECT TO authenticated USING (referrer_id = auth.uid() OR referred_id = auth.uid());
CREATE POLICY "Admin reads all referrals" ON public.referrals
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Transactions
CREATE POLICY "Users read own transactions" ON public.transactions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users insert own transactions" ON public.transactions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admin reads all transactions" ON public.transactions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ==================== FUNCTIONS & TRIGGERS ====================

-- Auto-generate referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  code TEXT;
BEGIN
  code := 'SAP-' || upper(substr(md5(random()::text), 1, 6));
  RETURN code;
END;
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  ref_code TEXT;
  referrer_uuid UUID;
BEGIN
  -- Generate unique referral code
  ref_code := public.generate_referral_code();
  
  -- Check for referrer from metadata
  IF NEW.raw_user_meta_data->>'referred_by' IS NOT NULL THEN
    SELECT id INTO referrer_uuid FROM public.profiles
    WHERE referral_code = NEW.raw_user_meta_data->>'referred_by';
  END IF;

  -- Create profile
  INSERT INTO public.profiles (id, phone, display_name, referral_code, referred_by)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Investor'),
    ref_code,
    referrer_uuid
  );

  -- Assign default role
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');

  -- Create referral record if referred
  IF referrer_uuid IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_id)
    VALUES (referrer_uuid, NEW.id);
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_ad_watches_updated_at BEFORE UPDATE ON public.ad_watches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Seed default plans
INSERT INTO public.plans (name, price, daily_earning, daily_ads, duration_days) VALUES
  ('Free', 0, 10, 10, 30),
  ('Silver', 1000, 60, 6, 30),
  ('Gold', 3500, 180, 4, 30),
  ('VIP', 6000, 350, 2, 30);
