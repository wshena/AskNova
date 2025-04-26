import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment variables.')
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export const checkAndRefreshSession = async () => {
  try {
    console.log('Manual session check & refresh')
    const currentSession = await supabase.auth.getSession()
    
    // Jika tidak ada sesi, coba refresh
    if (!currentSession.data.session) {
      console.log('No current session, attempting refresh')
      return await supabase.auth.refreshSession()
    }
    
    return currentSession
  } catch (error) {
    console.error('Error in checkAndRefreshSession:', error)
    throw error
  }
}

if (typeof window !== 'undefined') {
  // Only run in browser environment
  console.log('Supabase client initialized')
  
  try {
    console.log('Checking localStorage for Supabase session:')
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.includes('supabase.auth')) {
        console.log(`- Found key: ${key}`)
      }
    }
  } catch (e) {
    console.error('Error checking localStorage:', e)
  }
}

export default supabase