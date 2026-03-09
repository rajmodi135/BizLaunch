
import { createClient } from '@supabase/supabase-js'

// Replace with your actual project URL from Supabase dashboard
const supabaseUrl = 'https://kygrvjitvehtmhakzamc.supabase.co'
const supabaseKey = 'sb_publishable_ZJhJ9-IsG-5tps8ORVWtlQ_N6uCbIH5'

export const supabase = createClient(supabaseUrl, supabaseKey)
