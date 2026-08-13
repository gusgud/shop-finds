/* ==========================================================
   SUPABASE CONFIG
   ----------------------------------------------------------
   Isi 2 nilai di bawah dengan punya kamu dari Supabase:
   Dashboard Supabase -> Project Settings -> API

   SUPABASE_URL       -> "Project URL"
   SUPABASE_ANON_KEY   -> "anon public" key
                          (BUKAN "service_role" — jangan pernah
                          pakai service_role key di file ini atau
                          di file manapun yang dibuka browser)

   anon key ini AMAN untuk ditaruh di kode publik. Keamanan data
   diatur lewat Row Level Security (RLS) di Supabase, bukan lewat
   menyembunyikan key ini.
   ========================================================== */

const SUPABASE_URL = "https://bxcuzgdhuiuunaeelwrl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7leO3SlLoVlVdIM4V35c4w_udX-0JCl-0JCl";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
