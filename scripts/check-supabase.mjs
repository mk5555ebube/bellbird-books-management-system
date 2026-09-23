const supabaseUrl = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SECRET_KEY must be provided in .env.local",
  );
}

const restEndpoint = new URL("/rest/v1/", supabaseUrl);

const response = await fetch(restEndpoint, {
  headers: {
    apikey: secretKey,
  },
});

if (!response.ok) {
  throw new Error(`Supabase connection failed with status ${response.status}`);
}

console.log(`Supabase connection successful: ${restEndpoint.origin}`);