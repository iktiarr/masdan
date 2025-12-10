import Link from 'next/link';  // Tambah import Link
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"  // Asumsi shadcn sidebar
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar Panel */}
        <Sidebar className="w-64 bg-gray-100 border-r">
          <SidebarHeader>
            <h2 className="text-lg font-bold p-4">Dashboard Panel</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">  {/* Navigasi ke halaman utama dashboard */}
                    <Button variant="ghost" className="w-full justify-start">
                      Home
                    </Button>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="../dashboard/setting">  {/* Navigasi ke halaman settings */}
                    <Button variant="ghost" className="w-full justify-start">
                      Settings
                    </Button>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Tambah menu lain jika perlu */}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Area Konten Utama */}
        <main className="flex-1 p-6 bg-white">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
