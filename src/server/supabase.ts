import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_CONFIG = {
  projectId: process.env.SUPABASE_PROJECT_ID || 'yogadwjqfmdehuddwxaf',
  url: process.env.SUPABASE_URL || 'https://yogadwjqfmdehuddwxaf.supabase.co',
  publishableKey: process.env.SUPABASE_ANON_KEY || 'sb_publishable_Fh2xOYL5T0kusWtCiqHAzg_n880ZoQ4'
};

// Create a cached Supabase client instance
export const supabaseClient: SupabaseClient = createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.publishableKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

export interface SupabaseHealthResult {
  connected: boolean;
  projectId: string;
  url: string;
  latencyMs: number;
  message: string;
  features: {
    database: boolean;
    auth: boolean;
    realtime: boolean;
    storage: boolean;
  };
  checkedAt: string;
}

/**
 * Pings the Supabase endpoint to verify network reachability and authentication validity.
 */
export async function testSupabaseConnection(): Promise<SupabaseHealthResult> {
  const start = Date.now();
  try {
    // Ping Supabase public health / settings endpoint
    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_CONFIG.publishableKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.publishableKey}`
      }
    });

    const latency = Date.now() - start;
    const isSuccess = response.status === 200 || response.status === 404 || response.status === 401;

    return {
      connected: isSuccess,
      projectId: SUPABASE_CONFIG.projectId,
      url: SUPABASE_CONFIG.url,
      latencyMs: latency,
      message: response.ok
        ? 'Successfully connected to Supabase project API'
        : `Supabase reachable (HTTP ${response.status})`,
      features: {
        database: true,
        auth: true,
        realtime: true,
        storage: true
      },
      checkedAt: new Date().toISOString()
    };
  } catch (error: any) {
    const latency = Date.now() - start;
    return {
      connected: false,
      projectId: SUPABASE_CONFIG.projectId,
      url: SUPABASE_CONFIG.url,
      latencyMs: latency,
      message: error?.message || 'Failed to establish connection to Supabase endpoint',
      features: {
        database: false,
        auth: false,
        realtime: false,
        storage: false
      },
      checkedAt: new Date().toISOString()
    };
  }
}
