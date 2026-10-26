import test from 'node:test';
import assert from 'node:assert/strict';
import { supabaseClient, SUPABASE_CONFIG, testSupabaseConnection } from './supabase.ts';
import { SUPABASE_PROJECT_META } from '../utils/supabaseClient.ts';

test('Supabase Configuration - Connects to provided project ID', () => {
  assert.equal(SUPABASE_CONFIG.projectId, 'yogadwjqfmdehuddwxaf');
  assert.equal(SUPABASE_CONFIG.url, 'https://yogadwjqfmdehuddwxaf.supabase.co');
  assert.ok(
    SUPABASE_CONFIG.publishableKey.startsWith('sb_publishable_') ||
    SUPABASE_CONFIG.publishableKey.startsWith('eyJ')
  );
});

test('Supabase Client - Initialized with correct endpoint', () => {
  assert.ok(supabaseClient, 'Supabase client instance should be defined');
  assert.equal(typeof supabaseClient.from, 'function');
  assert.equal(typeof supabaseClient.auth, 'object');
});

test('Supabase Client Metadata - Client metadata contains correct project ref', () => {
  assert.equal(SUPABASE_PROJECT_META.projectId, 'yogadwjqfmdehuddwxaf');
  assert.equal(SUPABASE_PROJECT_META.url, 'https://yogadwjqfmdehuddwxaf.supabase.co');
  assert.ok(SUPABASE_PROJECT_META.keyPrefix.startsWith('sb_publishable_'));
});

test('Supabase Health Test - Pings endpoint and returns diagnostic status', async () => {
  const result = await testSupabaseConnection();
  assert.ok(typeof result.connected === 'boolean');
  assert.equal(result.projectId, 'yogadwjqfmdehuddwxaf');
  assert.equal(result.url, 'https://yogadwjqfmdehuddwxaf.supabase.co');
  assert.ok(typeof result.latencyMs === 'number');
  assert.ok(result.checkedAt);
});
