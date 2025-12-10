'use client';

import { useState, useEffect } from 'react';

interface MaintenanceStatus {
  isMaintenanceMode: boolean;
  isNotifyMode: boolean;
  minutesLeft: number;
}

export default function MaintenanceNotification() {
  const [status, setStatus] = useState<MaintenanceStatus | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch status dari API
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/maintenance-status');
        const data: MaintenanceStatus = await res.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching maintenance status:', error);
      }
    };

    fetchStatus();
    // Polling setiap 1 menit untuk update countdown
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status?.isNotifyMode) return null; // Jangan tampilkan jika bukan waktu notify

  return (
    <>
      {/* Notifikasi Melayang di Kiri Bawah */}
      <div className="fixed bottom-4 left-4 bg-yellow-500 text-white p-3 rounded-lg shadow-lg cursor-pointer z-50" onClick={() => setShowModal(true)}>
        <div className="flex items-center space-x-2">
          <span>🕒</span>
          <span>Maintenance dalam {status.minutesLeft} menit</span>
        </div>
      </div>

      {/* Modal Popup jika Diklik */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4">Pemberitahuan Maintenance</h2>
            <p>Website akan maintenance dalam <strong>{status.minutesLeft} menit</strong>. Maaf atas ketidaknyamanannya.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
