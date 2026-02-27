// Input sanitization to prevent XSS
export const sanitize = (input: string): string =>
  input.replace(/[<>"'&]/g, (c) => {
    const map: Record<string, string> = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "&": "&amp;" };
    return map[c] || c;
  });

// Phone number validation (Pakistani format)
export const isValidPhone = (phone: string): boolean =>
  /^03[0-9]{9}$/.test(phone.replace(/[\s-]/g, ""));

// Email validation
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;

// Password strength
export const isStrongPassword = (pw: string): boolean =>
  pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);

// Rate limiter (client-side, per-session)
const attempts: Record<string, { count: number; lastAttempt: number }> = {};

export const checkRateLimit = (key: string, maxAttempts = 5, windowMs = 60000): boolean => {
  const now = Date.now();
  const entry = attempts[key];
  if (!entry || now - entry.lastAttempt > windowMs) {
    attempts[key] = { count: 1, lastAttempt: now };
    return true;
  }
  if (entry.count >= maxAttempts) return false;
  entry.count++;
  entry.lastAttempt = now;
  return true;
};

// Amount validation
export const isValidAmount = (amount: number, min: number, max: number): boolean =>
  !isNaN(amount) && amount >= min && amount <= max;
