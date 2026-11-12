
export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  description: string;
}

export interface RecentActivity {
  id: string;
  title: string;
  detail: string;
  user: string;
  time: string;
}

export type InventoryStatus =
  | "active"
  | "maintenance"
  | "inactive";

export interface InventoryOverview {
  total: number;
  active: number;
  maintenance: number;
  inactive: number;
}

export interface DocumentationOverview {
  rackDocuments: number;
  cableRoutes: number;
  topologies: number;
}
