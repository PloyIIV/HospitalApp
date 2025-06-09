import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ktasubwxvxlghdhmhtuy.supabase.co"
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0YXN1Ynd4dnhsZ2hkaG1odHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNDEzMDAsImV4cCI6MjA0NzYxNzMwMH0.MB-8yH1Hqr1ocuP60lZ-jx88PrAOkjQK6bNnfHSefuY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
