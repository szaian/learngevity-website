import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.https,//edhwvkvmedignpngpxkw.supabase.co,
    process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaHd2a3ZtZWRpZ25wbmdweGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDk3OTU3OSwiZXhwIjoyMDgwNTU1NTc5fQ.nXWuRuurhM7gGmvIgjuRNyfqrE08JRzFNxGHV1C-ZNM,
  );

  const tutor = req.query.tutor;

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("tutor_email", tutor);

  if (error) return res.status(500).json({ success: false, error });

  res.status(200).json({ success: true, events: data });
}
