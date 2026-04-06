
CREATE OR REPLACE FUNCTION public.handle_deposit_approved()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only trigger when status changes to 'approved'
  IF NEW.status = 'approved' AND (OLD.status IS DISTINCT FROM 'approved') THEN
    UPDATE public.profiles
    SET balance = balance + NEW.amount,
        total_earned = total_earned + NEW.amount
    WHERE id = NEW.user_id;
    
    -- Log transaction
    INSERT INTO public.transactions (user_id, type, amount, description)
    VALUES (NEW.user_id, 'deposit', NEW.amount, 'Deposit approved - PKR ' || NEW.amount);
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_deposit_approved
  AFTER UPDATE ON public.deposits
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_deposit_approved();
