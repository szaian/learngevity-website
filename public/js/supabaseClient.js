// supabaseClient.js
// Frontend Supabase client (ANON key, safe for browser use)
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://edhwvkvmedignpngpxkw.supabase.co"; // <- your Supabase project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaHd2a3ZtZWRpZ25wbmdweGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Nzk1NzksImV4cCI6MjA4MDU1NTU3OX0.3IagtxjgsUpDA-kjzp1Dgf9bb8-tVsgTzbHgg6STRbQ"; // <- paste your anon key here

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
