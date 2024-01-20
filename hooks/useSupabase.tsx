import { useContext } from "react";

import { SupabaseContext } from "@/context/supabaseProvider";

export const useSupabase = () => useContext(SupabaseContext);
