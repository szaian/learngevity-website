// Load Supabase (dynamic import because CDN can't be used inside .js files)
import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2").then(({ createClient }) => {

  window.supabase = createClient(
    "https://edhwvkvmedignpngpxkw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaHd2a3ZtZWRpZ25wbmdweGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Nzk1NzksImV4cCI6MjA4MDU1NTU3OX0.3IagtxjgsUpDA-kjzp1Dgf9bb8-tVsgTzbHgg6STRbQ"
  );

  console.log("Supabase Loaded Successfully");
});
