
import {
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
} from "lucide-react";

import type { Branch } from "@/types/branch";

interface BranchStatsProps {
  branches: Branch[];
}

export default function BranchStats({
  branches,
}: BranchStatsProps) {
  // Menghitung seluruh cabang
  const totalBranches = branches.length;

  // Menghitung jumlah kota yang berbeda
  const totalCities = new Set(
    branches.map((branch) => branch.city)
  ).size;

  // Menghitung cabang dengan dokumentasi lengkap
  const completeBranches = branches.filter(
    (branch) => branch.documentationStatus === "complete"
  ).length;

  // Menghitung cabang yang dokumentasinya belum lengkap
  // Termasuk status incomplete dan not-started
  const incompleteBranches = branches.filter(
    (branch) => branch.documentationStatus !== "complete"
  ).length;

  // Data statistik
  const stats = [
    {
      label: "Total Cabang",
      value: totalBranches,
      icon: Building2,
      color: "text-emerald-600",
      background: "bg-emerald-50",
    },
    {
      label: "Total Kota",
      value: totalCities,
      icon: MapPin,
      color: "text-blue-600",
      background: "bg-blue-50",
    },
    {
      label: "Dokumentasi Lengkap",
      value: completeBranches,
      icon: CheckCircle2,
      color: "text-green-600",
      background: "bg-green-50",
    },
    {
      label: "Dokumentasi Perlu Dilengkapi",
      value: incompleteBranches,
      icon: Clock,
      color: "text-amber-600",
      background: "bg-amber-50",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.background}`}
              >
                <Icon size={20} className={stat.color} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-900">
              {stat.value.toLocaleString("id-ID")}
            </p>
          </div>
        );
      })}
    </section>
  );
}
