import { createClient } from "@supabase/supabase-js";
import { REACT_APP_SUPABASE_KEY } from "./constants";

export const supabaseUrl = 'https://jcdpcvahbtdwcxmukwyn.supabase.co';

export const supabase = createClient(
    supabaseUrl,
    REACT_APP_SUPABASE_KEY
);
