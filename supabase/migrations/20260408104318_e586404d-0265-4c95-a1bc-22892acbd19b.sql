
-- Rank rewards tracking
CREATE TABLE public.rank_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  rank_level INTEGER NOT NULL,
  reward_amount INTEGER NOT NULL DEFAULT 0,
  claimed BOOLEAN NOT NULL DEFAULT false,
  claimed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rank_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own rank rewards" ON public.rank_rewards FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users insert own rank rewards" ON public.rank_rewards FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own rank rewards" ON public.rank_rewards FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admin reads all rank rewards" ON public.rank_rewards FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Weekly salary tracking
CREATE TABLE public.weekly_salaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  week_start DATE NOT NULL,
  amount INTEGER NOT NULL DEFAULT 1400,
  paid BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start)
);

ALTER TABLE public.weekly_salaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own salaries" ON public.weekly_salaries FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users insert own salaries" ON public.weekly_salaries FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admin reads all salaries" ON public.weekly_salaries FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin updates salaries" ON public.weekly_salaries FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
