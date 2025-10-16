import 'dotenv/config';
import { createClient } from '@supabase/supabase-js'; 

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY); 
const { data, error } = await supabase.from('profiles').select('*');
console.log(data);