import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="h-full space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Utama</h1>
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p>berhasil</p>
        </CardContent>
      </Card>
    </div>
  )
}