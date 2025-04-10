import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://ssfvplrmttjaclwgfgmm.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey) 