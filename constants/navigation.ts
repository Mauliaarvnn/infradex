import {
  LayoutDashboard,
  Building2,
  Server,
  HardDrive,
  Cable,
  Network,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Kantor Cabang",
    href: "/branches",
    icon: Building2,
  },
  {
    label: "Inventaris Perangkat",
    href: "/devices",
    icon: Server,
  },
  {
    label: "Dokumentasi Rak",
    href: "/rack-documents",
    icon: HardDrive,
  },
  {
    label: "Jalur Kabel",
    href: "/cable-routes",
    icon: Cable,
  },
  {
    label: "Topologi Jaringan",
    href: "/topologies",
    icon: Network,
  },
  {
    label: "Riwayat Aktivitas",
    href: "/activity-logs",
    icon: ClipboardList,
  },
];