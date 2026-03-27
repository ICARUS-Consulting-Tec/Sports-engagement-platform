import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim();
const SUPABASE_PUBLISHABLE_DEFAULT_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

function isPlaceholderValue(value?: string) {
  if (!value) {
    return true;
  }

  return value.includes("your-");
}

export const isSupabaseConfigured =
  Boolean(SUPABASE_URL) &&
  Boolean(SUPABASE_PUBLISHABLE_DEFAULT_KEY) &&
  !isPlaceholderValue(SUPABASE_URL) &&
  !isPlaceholderValue(SUPABASE_PUBLISHABLE_DEFAULT_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL!, SUPABASE_PUBLISHABLE_DEFAULT_KEY!)
  : null;
