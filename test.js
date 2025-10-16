import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
const { data, error } = await supabase.from("TEST").select("*");

if (error) {
  console.log("Error:", error);
} else {
  console.log("Data:", data);
}
