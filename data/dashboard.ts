
import type {
  DashboardStat,
  RecentActivity,
  InventoryOverview,
  DocumentationOverview,
} from "@/types/dashboard";

// Dashboard Statistics
export const dashboardStats: DashboardStat[] = [
  {
    id: "branches",
    label: "Total Kantor Cabang",
    value: 24,
    description: "Cabang terdokumentasi",
  },
  {
    id: "devices",
    label: "Total Perangkat",
    value: 186,
    description: "Perangkat terdaftar",
  },
  {
    id: "racks",
    label: "Dokumentasi Rak",
    value: 32,
    description: "Dokumen rak server",
  },
  {
    id: "topologies",
    label: "Topologi Jaringan",
    value: 24,
    description: "Dokumen topologi",
  },
];

// Recent Activities
export const recentActivities: RecentActivity[] = [
  {
    id: "activity-001",
    title: "Perangkat baru ditambahkan",
    detail: "Router MikroTik RB4011 - Kantor Cabang Medan",
    user: "Administrator",
    time: "10 menit lalu",
  },
  {
    id: "activity-002",
    title: "Dokumentasi rak diperbarui",
    detail: "Rack Server Lantai 2 - Kantor Cabang Binjai",
    user: "Administrator",
    time: "35 menit lalu",
  },
  {
    id: "activity-003",
    title: "Topologi jaringan diunggah",
    detail: "Topologi LAN - Kantor Cabang Pematangsiantar",
    user: "Administrator",
    time: "1 jam lalu",
  },
  {
    id: "activity-004",
    title: "Data kantor cabang diperbarui",
    detail: "Kantor Cabang Medan",
    user: "Administrator",
    time: "2 jam lalu",
  },
];

// Inventory Overview
export const inventoryOverview: InventoryOverview = {
  total: 186,
  active: 150,
  maintenance: 24,
  inactive: 12,
};

// Documentation Overview
export const documentationOverview: DocumentationOverview = {
  rackDocuments: 32,
  cableRoutes: 48,
  topologies: 24,
};
