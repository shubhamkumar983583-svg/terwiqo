import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://yogadwjqfmdehuddwxaf.supabase.co';

const SUPABASE_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_Fh2xOYL5T0kusWtCiqHAzg_n880ZoQ4';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export const SUPABASE_PROJECT_META = {
  projectId: 'yogadwjqfmdehuddwxaf',
  url: SUPABASE_URL,
  keyPrefix: SUPABASE_KEY.substring(0, 18) + '...'
};
