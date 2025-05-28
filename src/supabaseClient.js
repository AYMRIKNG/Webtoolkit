
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lsvydfuoviovgczymslo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdnlkZnVvdmlvdmdjenltc2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MTc2NjMsImV4cCI6MjA1OTI5MzY2M30.tQpThw0wj19r9Ep7-PSsFEuySdnSMoDBnuVH3Zrr-8s'
export const supabase = createClient(supabaseUrl, supabaseKey)