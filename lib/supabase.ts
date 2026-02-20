import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn(
      "Supabase environment variables missing. Database operations will fail."
    );
    // Return a dummy client that will throw on use — this prevents build-time crashes
    _supabaseAdmin = createClient(
      "https://placeholder.supabase.co",
      "placeholder-key",
      { auth: { persistSession: false } }
    );
    return _supabaseAdmin;
  }

  console.log("Supabase connection configured for:", supabaseUrl);
  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
  return _supabaseAdmin;
}
