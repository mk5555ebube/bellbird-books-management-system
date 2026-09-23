import "server-only";

import { createClient } from "@supabase/supabase-js";

function requireEnvironmentVariable(
  name: "SUPABASE_URL" | "SUPABASE_SECRET_KEY",
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function createSupabaseServerClient() {
  const supabaseUrl = requireEnvironmentVariable("SUPABASE_URL");
  const secretKey = requireEnvironmentVariable("SUPABASE_SECRET_KEY");

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}