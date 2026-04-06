import { createServerSupabaseClient } from '@/utils/supabase/server';

/**
 * Re-exporting from utils to maintain project consistency.
 */
export const createClient = createServerSupabaseClient;
