
import AppShell from "@/components/layout/AppShell";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import InventoryOverview from "@/components/dashboard/InventoryOverview";
import DocumentationOverview from "@/components/dashboard/DocumentationOverview";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Page Heading */}
        <section>
          <p className="text-sm font-medium text-emerald-700">
            Overview
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Selamat datang di INFRADEX. Kelola dokumentasi
            infrastruktur jaringan dan server secara terpusat.
          </p>
        </section>

        {/* Dashboard Statistics */}
        <DashboardStats />

        {/* Inventory and Documentation Overview */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <InventoryOverview />
          <DocumentationOverview />
        </section>

        {/* Recent Activities */}
        <section>
          <RecentActivities />
        </section>
      </div>
    </AppShell>
  );
}
