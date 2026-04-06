import { createClient as createUtilsClient } from '@/utils/supabase/client';

/**
 * Re-exporting from utils to maintain project consistency.
 */
export const createClient = createUtilsClient;
