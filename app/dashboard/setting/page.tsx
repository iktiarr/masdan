// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface MaintenanceStatus {
//   isMaintenanceMode: boolean;
//   isNotifyMode: boolean;
//   minutesLeft: number;
// }

// export default function SettingsPage() {
//   const [status, setStatus] = useState<MaintenanceStatus | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch status saat load dan polling setiap 1 menit
//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const res = await fetch('/api/maintenance-status');
//         const data: MaintenanceStatus = await res.json();
//         setStatus(data);
//       } catch (error) {
//         console.error('Error fetching status:', error);
//       }
//     };
//     fetchStatus();
//     const interval = setInterval(fetchStatus, 60000); // Update setiap menit
//     return () => clearInterval(interval);
//   }, []);

//   // Fungsi toggle maintenance
//   const toggleMaintenance = async (enable: boolean) => {
//     setLoading(true);
//     try {
//       const res = await fetch('/api/maintenance/toggle', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ enable }),
//       });
//       if (res.ok) {
//         // Refresh status setelah toggle
//         const statusRes = await fetch('/api/maintenance-status');
//         // const newStatus = await statusRes.json();
//         setStatus(newStatus);
//       } else {
//         alert('Gagal toggle maintenance');
//       }
//     } catch (error) {
//       console.error('Error toggling maintenance:', error);
//       alert('Error: ' + error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Settings</h1>

//       {/* Card untuk Status Maintenance */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Maintenance Status</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {status ? (
//             <>
//               <p><strong>Status:</strong> {status.isMaintenanceMode ? 'Aktif (Maintenance Mode)' : 'Tidak Aktif'}</p>
//               {status.isNotifyMode && (
//                 <p><strong>Notifikasi:</strong> Maintenance dalam {status.minutesLeft} menit</p>
//               )}
//               <div className="flex space-x-4">
//                 <Button
//                   onClick={() => toggleMaintenance(true)}
//                   disabled={loading || status.isMaintenanceMode}
//                   variant="destructive"
//                 >
//                   {loading ? 'Loading...' : 'Enable Maintenance (1 Jam)'}
//                 </Button>
//                 <Button
//                   onClick={() => toggleMaintenance(false)}
//                   disabled={loading || !status.isMaintenanceMode}
//                   variant="outline"
//                 >
//                   {loading ? 'Loading...' : 'Disable Maintenance'}
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <p>Loading status...</p>
//           )}
//         </CardContent>
//       </Card>

//       {/* Tambah setting lain jika perlu */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Other Settings</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>Placeholder untuk setting lain.</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="h-full space-y-4">
        <h1>berhasil</h1>
    </div>
  )
}