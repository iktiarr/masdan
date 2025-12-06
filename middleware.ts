import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Cek status Maintenance dari file .env
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  // 2. Tentukan halaman maintenance kamu ada di mana
  const maintenancePage = '/page/maintenance'; // Atau '/maintenance' sesuai file yang kamu buat tadi

  // 3. Pengecualian (Wajib Ada!)
  // Kita TIDAK boleh memblokir akses ke:
  // - Halaman maintenance itu sendiri (biar gak loop)
  // - File aset (gambar, css, js) di folder public atau _next
  if (
    request.nextUrl.pathname.startsWith('/_next') || 
    request.nextUrl.pathname.includes('.') || // File berekstensi (.svg, .png, dll)
    request.nextUrl.pathname === maintenancePage
  ) {
    return NextResponse.next();
  }

  // 4. Logika Redirect
  if (isMaintenanceMode) {
    // Jika mode ON, paksa user melihat halaman maintenance
    // Menggunakan 'rewrite' agar URL tetap (domain.com) tapi isinya halaman maintenance
    return NextResponse.rewrite(new URL(maintenancePage, request.url));
  }

  // Jika mode OFF, lanjut seperti biasa
  return NextResponse.next();
}

// Tentukan middleware ini berjalan di halaman mana saja
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}