import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Tambahkan log ini agar muncul di terminal saat error
  if (!url || !key) {
    console.error("⚠️ FATAL ERROR: Supabase URL atau Key KOSONG saat build!")
    console.error("URL:", url) // Cek apakah undefined
    console.error("Key:", key ? "Ada (Tersembunyi)" : "Tidak Ada")
  }

  // Gunakan string kosong sebagai fallback agar build tidak langsung crash di baris ini
  // (Nanti errornya akan pindah ke saat fetch data, tapi setidaknya kita tau env-nya masuk atau tidak)
  return createBrowserClient(
    url || "",
    key || ""
  )
}