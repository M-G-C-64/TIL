import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yoelrkppsapyahcvgxjm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZWxya3Bwc2FweWFoY3ZneGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjI0MDUsImV4cCI6MTk5NjYzODQwNX0.DURvskU7F68MfHEVpvb3FgIIXZse9R0RyDUUfY_vKh0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
