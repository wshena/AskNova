import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getCurrentUser = async () => {
  const supabase = await createSupabaseServerClient();

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return {
        success: false,
        data: null,
        message: error?.message || 'User not found',
      };
    }

    // Konversi user menjadi plain object
    const plainUser = JSON.parse(JSON.stringify(user));

    return plainUser

  } catch (err: any) {
    console.error('getCurrentUser error:', err);
    return {
      success: false,
      data: null,
      message: err.message || 'Unknown error',
    };
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser()

  return !!user?.data
}

export const logout = async () => {
  const supabase = await createSupabaseServerClient();

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 10000)
    );

    const { error } = await Promise.race([
      supabase.auth.signOut(),
      timeoutPromise
    ]) as { error?: Error };

    if (error) {
      console.error('There are erro when signOut Supabase:', error.message);
      throw error;
    }

  } catch (error: any) {
    console.error('Error accure on performLogout function:', error.message);
    throw error;
  }
}